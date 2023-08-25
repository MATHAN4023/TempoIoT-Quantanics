const express = require('express')
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const app = express()
const nodemailer = require('nodemailer');
app.use(cors())
app.use(express.json())
require('dotenv').config();
const Pool = require('pg').Pool
const sqlFilePath = path.join(__dirname, 'database', 'import.sql');

const User_db_connection = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'tempo_roof',
    password: process.env.PASSWORD,
    port: 5432,
})

var pool
app.get('/source_db/:dbname', async (req, res) => {
    const { dbname } = req.params;
    const result = dbname;
    console.log("your db is : ", result);

    pool = new Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: result,
        password: process.env.PASSWORD,
        port: 5432,
    });
    if (pool) {
        res.json({ message: "db changed successfully" })
    }
})

app.post('/validate_login', async (req, res) => {
    const { username, password } = req.body;
    try {
        
        const validate = await User_db_connection.query('SELECT COUNT(*) FROM user_credential  where user_name=$1 and password=$2', [username, password]);
        const row_count = validate.rows[0]['count'];
        if (row_count == 1) {
            try {
                const db_name = await User_db_connection.query(`SELECT "user".r_no, "user".user_id, "user".first_name, "user".role_id, "user".site_id ,"user".status, "user".active ,"user".email,
                user_access_control.site_management, user_access_control.device_management, user_access_control.user_management, user_access_control.dashboard
                FROM user_credential 
                JOIN user_access_control ON user_credential.user_id = user_access_control.user_id 
                JOIN "user" ON user_credential.user_id = "user".user_id 
                WHERE user_credential.user_name = $1 AND user_credential.password = $2;`, [username, password]);
                res.status(200).json({ data: db_name.rows[0], status: true });
            } catch (error) {
                console.log(error)
            }
          
            pool = null;
        }
        else {
            res.status(200).json({ data: "invalid Credentials", status: false });
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/get_parameters', async (req, res) => {
    try {
        const datas = await pool.query("select *from device_data_collection ORDER BY r_no");
        if (!datas) {
            return null;
        } else {
            return res.json(datas.rows);
        }
    } catch (e) {
        console.log("error : ", e);
    }
})


app.get('/admin', async (req, res) => {
    try {
        const data = await User_db_connection.query('SELECT site_id,site_status,site_name from site ORDER BY r_no;');
        res.json(data.rows);
    } catch (error) {
        console.log(error)
    }
})

// get user
app.get('/user_management', async (req, res) => {
    try {
        const { user_type, user_site_id } = req.query;
        if (user_type == 'RI001' || user_type == 'RI002') {
            const datas = await User_db_connection.query(`SELECT u.*, r.* 
            FROM public."user" u
            JOIN public."roles" r ON u.role_id = r.role_id
            ORDER BY u.user_id;`);
            res.json(datas.rows);
        } else {
            try {
                const datas = await User_db_connection.query(`SELECT u.*, r.* 
                FROM public."user" u
                JOIN public."roles" r ON u.role_id = r.role_id
                WHERE u.site_id = ANY (string_to_array($1, ','))
                    OR u.site_id = $2
                ORDER BY u.user_id;
                `, [user_site_id, user_site_id]);
                res.json(datas.rows);

            } catch (error) {
                console.log(error)
            }

        }
    } catch (err) {
        console.log(err);
    }
})
// add_user
app.post('/add_user', async (req, res) => {


    const { first_name, last_name, roleid, contact, Designation, site_id, email, selectedOption_site, selectedOption_user, selectedOption_device, selectedOption_dashboard } = req.body


    const add_user_query = `INSERT INTO public."user"( first_name, last_name, role_id, contact, designation, site_id, email ,status, active) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING user_id;`;
    const add_user_values = [first_name, last_name, roleid, contact, Designation, site_id, email, "1", "1"];

    const user_privilage_query = `INSERT INTO public.user_access_control(site_id, user_id, site_management, user_management, device_management, dashboard) VALUES ($1, $2, $3, $4, $5, $6)`;
    const user_privilage_values = [site_id, null, selectedOption_site, selectedOption_user, selectedOption_device, selectedOption_dashboard];
    try {
        const result = await User_db_connection.query(add_user_query, add_user_values);
        const user_id = result.rows[0].user_id;
        user_privilage_values[1] = user_id;
        const user_privilage = await User_db_connection.query(user_privilage_query, user_privilage_values);
        if (result) {
            res.status(200).json({ message: "Site data inserted successfully" });
        }
    } catch (err) {
        res.status(400).json({ message: "Site data inserted successfully" });
        console.log(err);
    }
})

// Edit user data retrive
app.get('/edit_user/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params
        const datas = await User_db_connection.query(`SELECT "user".r_no, "user".user_id, "user".first_name, "user".last_name, "user".role_id, "user".contact, "user".designation, "user".site_id, "user".status, "user".active, "user".email,
        user_access_control.user_management, user_access_control.site_management, user_access_control.device_management, user_access_control.dashboard
        FROM "user"
        JOIN user_access_control ON "user".user_id = user_access_control.user_id
        where "user".user_id=$1;`, [user_id]);
        res.json(datas.rows);
    } catch (err) {
        console.log(err)
    }
})

// update the user(edit)
app.put('/update_user', async (req, res) => {
    const { first_name, last_name, roleid, contact, Designation, siteid, email, user_id, selectedOption_site, selectedOption_user, selectedOption_device, selectedOption_dashboard } = req.body

    await User_db_connection.query(`WITH updated_user AS (
        UPDATE public."user"
        SET
          first_name = $1,
          last_name = $2,
          role_id = $3,
          contact = $4,
          designation = $5
        WHERE
          user_id = $6
        RETURNING user_id
      )
      UPDATE user_access_control AS a
      SET
        site_management = $7,
        user_management = $8,
        device_management = $9,
        dashboard = $10
      FROM updated_user AS u
      WHERE
        a.user_id = u.user_id;`, [first_name, last_name, roleid, contact, Designation, user_id, selectedOption_site, selectedOption_user, selectedOption_device, selectedOption_dashboard]);
    return res.sendStatus(200);
})

// get data from device management page to device edit page
app.get('/edit_device_detials/:id', async (req, res) => {
    try {
        const { id } = req.params
        const datas = await pool.query(' SELECT * FROM device_management JOIN network_protocol ON device_management.device_id = network_protocol.device_id JOIN device_data_collection ON  device_management.device_id = device_data_collection.device_id WHERE device_management.r_no = $1', [id]);
        res.json(datas.rows);
    } catch (err) {
        console.log(err)
    }
});

app.get('/edit_site_detials/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const datas = await User_db_connection.query(
            `SELECT s.*, l.*, u.* 
            FROM site AS s 
            INNER JOIN location AS l ON s.location_id = l.location_id 
            INNER JOIN "user" AS u ON s.site_id = ANY (string_to_array(u.site_id, \',\'))
            INNER JOIN roles AS r ON r.role_id = u.role_id 
            WHERE r.role = 'Site Admin' AND s.site_id = $1;`,
            [id]
        );
        res.json(datas.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred' });
    }
});



//GET REQUEST TO SHOW ALL THE DATA IN REACT PAGE
app.get("/user", async (req, res) => {
    try {
        const datas = await pool.query('SELECT * FROM device_management ORDER BY r_no')
        res.json(datas.rows);
    } catch (err) {
        console.log(err)
    }
})

app.get("/user1", async (req, res) => {
    try {
        const datas = await pool.query('SELECT * FROM device_management WHERE device_status=$1 ORDER BY r_no', [1])
        res.json(datas.rows);
    } catch (err) {
        console.log(err)
    }
})


app.get("/network", async (req, res) => {
    try {
        const datas = await pool.query('SELECT * FROM network_protocol ORDER BY r_no')
        res.json(datas.rows);
    } catch (err) {
        console.log(err)
    }
})

//GET REQUEST TO SHOW ALL THE DATA IN REACT PAGE
app.get("/user_roof", async (req, res) => {
    try {
        const sites = await User_db_connection.query('SELECT * FROM "user" ORDER BY r_no');
        res.json(sites.rows);
    } catch (err) {
        console.log(err);
    }
});

app.get("/site", async (req, res) => {
    try {
        const sites = await User_db_connection.query(`SELECT u.*, s.*, l.* FROM "user" AS u JOIN site AS s ON s.site_id = ANY (string_to_array(u.site_id, \',\')) JOIN "location" AS l ON s.location_id = l.location_id WHERE u.role_id='RI003';`);
        res.json(sites.rows);
    } catch (err) {
        console.log(err);
    }
});

//remove duplicate values in site_company
app.get("/site_company", async (req, res) => {
    try {
        const query = "SELECT DISTINCT company FROM site";
        const companyNames = await User_db_connection.query(query);
        res.json(companyNames.rows);
    } catch (err) {
        console.log(err);
    }
});

//remove duplicate admin
app.get("/site_admin/:site_id", async (req, res) => {
    try {
        const { site_id } = req.params;
        const query =
            `SELECT s.*
            FROM public."user" AS s
            INNER JOIN public."roles" AS c ON s.role_id = c.role_id
            WHERE c."role" = 'Site Admin'
            AND s.site_id <> $1`;
        const adminNames = await User_db_connection.query(query, [site_id]);
        res.json(adminNames.rows);
    } catch (err) {
        console.log(err);
    }
});
app.get("/site_admin1", async (req, res) => {
    try {
        const query =
            `SELECT s.*
            FROM public."user" AS s
            INNER JOIN public."roles" AS c ON s.role_id = c.role_id
            WHERE c."role" = 'Site Admin';`;
        const adminNames = await User_db_connection.query(query);
        res.json(adminNames.rows);
    } catch (err) {
        console.log(err);
    }
});

//get data for location in location table

app.get("/location_name", async (req, res) => {
    try {
        const query = "SELECT DISTINCT location_name , address FROM location";
        const locationName = await User_db_connection.query(query);
        res.json(locationName.rows);
        // console.log("checkingg",locationName);
    } catch (err) {
        console.log(err);
    }
});

//get data for roles in role table 

app.get("/role_name", async (req, res) => {
    try {
        const query = "SELECT * FROM roles ORDER BY r_no ";
        const rolesName = await User_db_connection.query(query);
        res.json(rolesName.rows);
    } catch (err) {
        console.log(err);
    }
});



//distinct for device model drop down
app.get("/device_modeldata", async (req, res) => {
    try {
        const query = "SELECT DISTINCT device_model FROM device_management";
        const deviceModel = await pool.query(query);
        res.json(deviceModel.rows);
    } catch (err) {
        console.log(err);
    }
});

app.get("/devicecount",async(req,res)=>{
    try {
        const query=await pool.query("SELECT COUNT(*) from device_management WHERE device_status=$1;",[1])
        res.json(query.rows)
    } catch (error) {
        console.log(error);
    }
})



//distinct for device name drop down
app.get("/device_namedata", async (req, res) => {
    try {
        const query = "SELECT DISTINCT device_name FROM device_management";
        const deviceNames = await pool.query(query);
        res.json(deviceNames.rows);
    } catch (err) {
        console.log(err);
    }
});




//PUT REQUEST TO UPDATE THE DATA IN DB
app.put("/userdata/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { devicestatus } = req.body;
        const response=await pool.query('UPDATE device_management SET  device_status=$1 WHERE r_no=$2', [devicestatus, id])
        res.json("Data manipulated");
    } catch (err) {
        console.log(err)
    }
})
app.put("/update_activate_status/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const { devicestatus } = req.body;
        const response= await User_db_connection.query(`UPDATE public."user" SET status=$1, active=$2 WHERE user_id=$3;`, [devicestatus, devicestatus, user_id])
        res.json("Data manipulated");
    } catch (err) {
        console.log(err)
    }
})

app.put("/edit_site_details", async (req, res) => {
    try {
        const first_name = req.body["first_name"];
        const site_name = req.body["site_name"];
        const last_name = req.body["last_name"];
        const contact = req.body["contact"];
        const email = req.body["email"];
        const designation = req.body["designation"];
        const site_address = req.body["site_address"];
        const company_name = req.body["company_name"];
        const location_name = req.body["location_name"];
        const site_id = req.body["site_id"];
        const user_id = req.body["user_id"];
        const isEditMode = req.body["isEditMode"];
        if (isEditMode == true) {
            try {
                const ins = `INSERT INTO "user"(site_id,first_name, last_name, designation, contact, email, role_id) VALUES ($1, $2, $3, $4, $5, $6,$7) `;
                const values = [site_id, first_name, last_name, designation, contact, email, role_id];
                const del=await User_db_connection.query(`UPDATE "user" SET site_id='', status='0' WHERE user_id=$1`, [user_id]);
                const user_val = await User_db_connection.query(ins, values);
                if (user_val) {
                    res.status(200).send("Site details updated successfully");
                }
            } catch (error) {
                console.log(error);
            }
        }
        else if (isEditMode === false) {
            try {
                const ins = `UPDATE "user" SET site_id = CONCAT(site_id, ',${site_id}') WHERE email = '${email}';`;
                const values = [site_id, email];
                const del=await User_db_connection.query(`UPDATE "user" SET site_id='', status='0' WHERE user_id=$1`, [user_id]);
                const user_val = await User_db_connection.query(ins);
                if (user_val) {
                    console.log("here");
                    res.status(200).send("Site details updated successfully");
                }
            } catch (error) {
                console.log(error);
            }
        }else{
            res.status(400).send("Site details updated successfully");
        }
        
        // Update "site" table
        const ins1 = 'UPDATE site SET site_name = $1, company = $2 WHERE site_id = $3 RETURNING location_id;';
        const values1 = [site_name, company_name, site_id];


        // Update "location" table
        const ins2 = 'UPDATE "location" SET location_name = $1, address = $2 WHERE location_id = $3;';
        const values2 = [location_name, site_address, null];

        const result = await User_db_connection.query(ins1, values1);
        const location_id_res = result.rows[0].location_id;
        values2[2] = location_id_res;

        const result1 = await User_db_connection.query(ins2, values2);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while updating site details");
    }
});

//PUT REQUEST TO UPDATE THE DATA IN DB
app.put("/sitedata/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await User_db_connection.query('UPDATE site SET site_status=$1 WHERE site_id=$2', [status, id])
        res.status(200).json({ message: "Site data inserted successfully" });
    } catch (err) {
        console.log(err)
    }
})



//DELETE REQUEST TO DELETE THE DATA IN DB
app.delete("/user", async (req, res) => {
    try {
        const datas = await pool.query('DELETE FROM device_management WHERE  r_no=$1', [r_no])
    } catch (err) {
        console.log(err)
    }

})


//PUT REQUEST TO STORE THE DATA FROM THE REACT TO DB
app.post("/user", async (req, res) => {
    try {

        //getting data for enabled srevice
        const data = req.body
        const enables = req.body["checking"]


        // mqtt connection
        if (enables === "true") {

            let topicname = req.body["devicemacaddress"]
            topicname = topicname.replace(/[:\-]/g, "_")

            //TAKE COPY of the file
            const fileName = topicname + '.js';
            const fileContent = fs.readFileSync('./Copying.js')
            const filePath = 'copy/' + fileName
            // write the file
            fs.writeFileSync(filePath, fileContent);

            let allData = []
            allData = JSON.parse(fs.readFileSync('allData.json', 'utf8'));
            allData.push(data);
            fs.writeFileSync('allData.json', JSON.stringify(allData));

        }


        //getting data from client side
        const client_id = req.body["clientid"]
        const device_name = req.body["devicename"]
        const device_status = req.body["devicestatus"]
        const device_mac_address = req.body["devicemacaddress"]
        const device_firmware_version = req.body["firmwareversion"]
        const mqtt_client_name = req.body["clientname"]
        const mqtt_host = req.body["host"]
        const user_name = req.body["username"]
        const password = req.body["password"]
        const device_model = req.body["devicemodel"]
        const topic_name = req.body["topicname"]
        const concatenatedValues = req.body["concatenatedValues"]
        const is_service_enabled = req.body["checking"];


        //connection to device_management
        const ins = 'INSERT INTO device_management (device_name, device_mac_address, device_firmware_version, device_model, is_service_enabled) VALUES ($1, $2, $3, $4, $5) RETURNING device_id';
        const values = [device_name, device_mac_address, device_firmware_version, device_model, is_service_enabled];

        // Connection to network_protocol
        const ins1 = 'INSERT INTO network_protocol (device_id, client_id, username, password, host) VALUES ($1, $2, $3, $4, $5)';
        const values1 = [null, client_id, user_name, password, mqtt_host];

        //device_data_collection
        const ins2 = 'INSERT INTO device_data_collection(device_id,device_parameters) VALUES ($1,$2)';
        const values2 = [null, concatenatedValues]

        // Execute the first query to insert into device_management
        const result = await pool.query(ins, values);
        const device_id = result.rows[0].device_id;

        // Update the device_id value in the second query
        values1[0] = device_id;
        values2[0] = device_id;

        //  insert into network_protocol
        await pool.query(ins1, values1);

        //connection to device_data_collection
        await pool.query(ins2, values2)

    } catch (err) {
        console.log(err)
    }
})

//PUT REQUEST TO STORE THE DATA FROM THE REACT TO DB
app.post("/site", async (req, res) => {
    try {
        const { company_name, site_name, location_name, first_name, last_name, Desigination, contact, email, site_address, role_id, checkemail } = req.body

        // data insert into user table
        const ins3 = 'INSERT INTO location(location_name, address) VALUES ($1, $2) RETURNING location_id';
        const values3 = [location_name, site_address];


        var ins4,values4;


        // data insert into user table
        const ins5 = 'INSERT INTO site(location_id, company, site_name) VALUES ($1, $2, $3) RETURNING site_id';
        const values5 = [null, company_name, site_name];

        const result_loc_id = await User_db_connection.query(ins3, values3);
        const location_id = result_loc_id.rows[0].location_id;
        values5[0] = location_id;

        const result_site_id = await User_db_connection.query(ins5, values5);
        const site_id = result_site_id.rows[0].site_id;

        if (checkemail == true) {
            ins4 = `UPDATE "user" SET site_id = CONCAT(site_id, ',${site_id}') WHERE email = '${email}';`;
        }
        else {
            ins4 = `INSERT INTO "user"(site_id,first_name, last_name, designation, contact, email, role_id) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING user_id`;
            values4 = [site_id, first_name, last_name, Desigination, contact, email, role_id];
        }
        const result = await User_db_connection.query(ins4, values4);
        if(checkemail==false){
            const user_id=result.rows[0].user_id;
           try {
                await User_db_connection.query('INSERT INTO user_access_control (site_id, user_id, site_management, user_management, device_management, dashboard) VALUES ($1,$2,$3,$4,$5,$6)',[site_id,user_id,'0','3','3','1'])
           } catch (error) {
            console.log(error)
           }
        }
        if (result) {
            res.status(200).json({ message: "Site data inserted successfully" });
            const uppercase_site_id = site_id.toUpperCase();
            await User_db_connection.query(`CREATE DATABASE "${uppercase_site_id}";`);

            const pool1 = new Pool({
                user: 'postgres',
                host: 'localhost',
                database: `${site_id}`,
                password: process.env.PASSWORD, 
                port: 5432,
            });

            const sqlFileContent = fs.readFileSync(sqlFilePath, 'utf-8');
            pool1.query(sqlFileContent, (err, result) => {
                if (err) {
                    console.error('Error executing SQL file:', err);
                } else {
                    console.log('All queries executed successfully');
                }
                pool1.end();
            });
        }

    } catch (error) {
        console.error(error);
    }
});

app.post('/sendemail', (req, res) => {
    const { email, subject, html } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mahimairichard@gmail.com',
            pass: 'igwn kzab qvnz aguj'
        }
    });
    const to = email;
    // Define the email options
    const mailOptions = {
        from: 'mahimairichard@gmail.com',
        to,
        subject,
        html
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Email sent successfully' });
        }
    });
});

app.post('/updatepassword', async (req, res) => {
    const { newpassword, decryptedtext } = req.body;
    await User_db_connection.query('UPDATE user_credential SET password=$1 WHERE user_name=$2', [newpassword, decryptedtext])
})

app.get('/get-password', async (req, res) => {
    const username = req.query.username; 
    try {
        const query = 'SELECT password FROM user_credential WHERE user_name = $1';
        const result = await User_db_connection.query(query, [username]);

        if (result.rows.length > 0) {
            res.json({ password: result.rows[0].password });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error('Error fetching data', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(4000, () => {
    console.log("server is running on port 4000")
})