
CREATE FUNCTION public.devicetrigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO device_management_log(device_id, device_name, device_model, device_mac_address, device_firmware_version, description, last_updated_by)
    VALUES (NEW.device_id, NEW.device_name, NEW.device_model, NEW.device_mac_address, NEW.device_firmware_version, NEW.description, NEW.last_updated_by);
    RETURN NEW;
END;
$$;

ALTER FUNCTION public.devicetrigger() OWNER TO postgres;


CREATE FUNCTION public.devicetrigger_del() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO device_management_log(device_id, device_name, device_model, device_mac_address, device_firmware_version, description, last_updated_by)
    VALUES (NEW.device_id, NEW.device_name, NEW.device_model, NEW.device_mac_address, NEW.device_firmware_version, NEW.description, NEW.last_updated_by);
    RETURN NEW;
END;
$$;

ALTER FUNCTION public.devicetrigger_del() OWNER TO postgres;


CREATE FUNCTION public.insert_value_to_network_protocol_collection() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO network_protocol_collection (protocol_id)
    VALUES (NEW.protocol_id);
    RETURN NEW;
END;
$$;

ALTER FUNCTION public.insert_value_to_network_protocol_collection() OWNER TO postgres;


CREATE FUNCTION public.notify_device_management_changes() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    PERFORM pg_notify('table_changes', row_to_json(NEW)::text);
    RETURN NEW;
END;
$$;

ALTER FUNCTION public.notify_device_management_changes() OWNER TO postgres;


CREATE FUNCTION public.site_insert_trg() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO site_management_log(company_name, site_name, site_admin_email, site_location, site_address, site_admin_name, new_site_admin_name, industry)
    VALUES (NEW.company_name, NEW.site_name, NEW.site_admin_email, NEW.site_location, NEW.site_address, NEW.site_admin_name, NEW.new_site_admin_name, NEW.industry);
    RETURN NEW;
END;
$$;

ALTER FUNCTION public.site_insert_trg() OWNER TO postgres;


CREATE TABLE public.device_data_collection (
    r_no integer NOT NULL,
    device_id character varying(100),
    device_parameters character varying(100)
);

ALTER TABLE public.device_data_collection OWNER TO postgres;

CREATE SEQUENCE public.device_data_collection_r_no_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;

ALTER TABLE public.device_data_collection_r_no_seq OWNER TO postgres;

ALTER SEQUENCE public.device_data_collection_r_no_seq OWNED BY public.device_data_collection.r_no;

CREATE TABLE public.device_management (
    r_no integer NOT NULL,
    device_id character varying(45),
    device_model character varying(45),
    device_mac_address character varying(45),
    device_firmware_version character varying(45),
    description character varying(100),
    last_updated_by character varying(45),
    device_name character varying(45),
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_service_enabled character varying,
    device_status integer DEFAULT 1
);

ALTER TABLE public.device_management OWNER TO postgres;

CREATE SEQUENCE public.device_management_r_no_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;

ALTER TABLE public.device_management_r_no_seq OWNER TO postgres;

ALTER SEQUENCE public.device_management_r_no_seq OWNED BY public.device_management.r_no;

CREATE SEQUENCE public.device_management_device_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;

ALTER TABLE public.device_management_device_id OWNER TO postgres;

ALTER SEQUENCE public.device_management_device_id OWNED BY public.device_management.device_id;

CREATE TABLE public.device_management_log (
    device_id character varying(45),
    device_model character varying(45),
    device_mac_address character varying(45),
    device_firmware_version character varying(45),
    description character varying(100),
    last_updated_by character varying(45),
    device_name character varying,
    last_updated_on timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    r_no integer NOT NULL
);

ALTER TABLE public.device_management_log OWNER TO postgres;

CREATE SEQUENCE public.device_management_log_r_no_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;

ALTER TABLE public.device_management_log_r_no_seq OWNER TO postgres;

ALTER SEQUENCE public.device_management_log_r_no_seq OWNED BY public.device_management_log.r_no;

CREATE TABLE public.network_protocol (
    r_no bigint NOT NULL,
    protocol_id character varying(45) NOT NULL,
    device_id character varying(45),
    client_id character varying(45),
    username character varying(45),
    password character varying(45),
    host character varying(45),
    port character varying(45),
    last_updated_by character varying(45),
    last_updated_on time without time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.network_protocol OWNER TO postgres;

CREATE TABLE public.network_protocol_collection (
    r_no integer NOT NULL,
    protocol_id character varying(100),
    protocol_name character varying(200)
);

ALTER TABLE public.network_protocol_collection OWNER TO postgres;

CREATE SEQUENCE public.network_protocol_collection_r_no_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;

ALTER TABLE public.network_protocol_collection_r_no_seq OWNER TO postgres;

ALTER SEQUENCE public.network_protocol_collection_r_no_seq OWNED BY public.network_protocol_collection.r_no;

CREATE SEQUENCE public.network_protocol_protocol_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;

ALTER TABLE public.network_protocol_protocol_id OWNER TO postgres;

ALTER SEQUENCE public.network_protocol_protocol_id OWNED BY public.network_protocol.protocol_id;

CREATE SEQUENCE public.network_protocol_r_no_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;

ALTER TABLE public.network_protocol_r_no_seq OWNER TO postgres;

ALTER SEQUENCE public.network_protocol_r_no_seq OWNED BY public.network_protocol.r_no;

ALTER TABLE ONLY public.device_data_collection ALTER COLUMN r_no SET DEFAULT nextval('public.device_data_collection_r_no_seq'::regclass);

ALTER TABLE ONLY public.device_management ALTER COLUMN r_no SET DEFAULT nextval('public.device_management_r_no_seq'::regclass);


ALTER TABLE ONLY public.device_management ALTER COLUMN device_id SET DEFAULT ('DI'::text || nextval('public.device_management_device_id'::regclass));

ALTER TABLE ONLY public.device_management_log ALTER COLUMN r_no SET DEFAULT nextval('public.device_management_log_r_no_seq'::regclass);

ALTER TABLE ONLY public.network_protocol ALTER COLUMN r_no SET DEFAULT nextval('public.network_protocol_r_no_seq'::regclass);

ALTER TABLE ONLY public.network_protocol ALTER COLUMN protocol_id SET DEFAULT ('PI'::text || nextval('public.network_protocol_protocol_id'::regclass));

ALTER TABLE ONLY public.network_protocol_collection ALTER COLUMN r_no SET DEFAULT nextval('public.network_protocol_collection_r_no_seq'::regclass);

ALTER TABLE ONLY public.device_data_collection ADD CONSTRAINT device_data_collection_pkey PRIMARY KEY (r_no);

ALTER TABLE ONLY public.network_protocol ADD CONSTRAINT device_id_ukey UNIQUE (device_id);

ALTER TABLE ONLY public.device_management_log ADD CONSTRAINT device_management_log_pkey PRIMARY KEY (r_no);

ALTER TABLE ONLY public.device_management ADD CONSTRAINT device_management_pkey PRIMARY KEY (r_no);

ALTER TABLE ONLY public.network_protocol_collection ADD CONSTRAINT network_protocol_collection_pkey PRIMARY KEY (r_no);

ALTER TABLE ONLY public.network_protocol ADD CONSTRAINT network_protocol_pkey PRIMARY KEY (r_no);

CREATE TRIGGER device_management_changes_trigger AFTER INSERT OR DELETE OR UPDATE ON public.device_management FOR EACH ROW EXECUTE FUNCTION public.notify_device_management_changes();

CREATE TRIGGER device_management_trg AFTER INSERT ON public.device_management FOR EACH ROW EXECUTE FUNCTION public.devicetrigger();

CREATE TRIGGER device_management_trg_del AFTER UPDATE ON public.device_management FOR EACH ROW EXECUTE FUNCTION public.devicetrigger_del();  

