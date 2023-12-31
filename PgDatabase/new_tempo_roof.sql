PGDMP         "        
        {         
   tempo_roof    15.2    15.2 L    X           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Y           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            Z           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            [           1262    16753 
   tempo_roof    DATABASE     }   CREATE DATABASE tempo_roof WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_World.1252';
    DROP DATABASE tempo_roof;
                postgres    false            �            1255    16754 #   save_value_to_user_access_control()    FUNCTION     �   CREATE FUNCTION public.save_value_to_user_access_control() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO user_access_control (site_id,user_id)
    VALUES (NEW.site_id,NEW.user_id);
    RETURN NEW;
END;
$$;
 :   DROP FUNCTION public.save_value_to_user_access_control();
       public          postgres    false            �            1255    16755    sync_user_id_in_credentials()    FUNCTION     �  CREATE FUNCTION public.sync_user_id_in_credentials() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO user_credential (user_id,user_name)
        VALUES (NEW.user_id,NEW.email);
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE user_credential
        SET user_name = NEW.email
        WHERE user_id = NEW.user_id;
    END IF;

    RETURN NEW;
END;
$$;
 4   DROP FUNCTION public.sync_user_id_in_credentials();
       public          postgres    false            �            1259    16756 
   department    TABLE     �   CREATE TABLE public.department (
    r_no integer NOT NULL,
    department_name character varying(200),
    last_updated_by character varying(200),
    last_updated_on character varying DEFAULT CURRENT_TIMESTAMP,
    department_id character varying
);
    DROP TABLE public.department;
       public         heap    postgres    false            �            1259    16762    department_r_no_seq    SEQUENCE     �   CREATE SEQUENCE public.department_r_no_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.department_r_no_seq;
       public          postgres    false    214            \           0    0    department_r_no_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.department_r_no_seq OWNED BY public.department.r_no;
          public          postgres    false    215            �            1259    16763    location    TABLE     (  CREATE TABLE public.location (
    r_no integer NOT NULL,
    location_id character varying(200),
    location_name character varying(200),
    last_updated_by character varying(200),
    last_updated_on character varying DEFAULT CURRENT_TIMESTAMP NOT NULL,
    address character varying(200)
);
    DROP TABLE public.location;
       public         heap    postgres    false            �            1259    16769    location_location_id    SEQUENCE     �   CREATE SEQUENCE public.location_location_id
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 1000000
    CACHE 1;
 +   DROP SEQUENCE public.location_location_id;
       public          postgres    false    216            ]           0    0    location_location_id    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.location_location_id OWNED BY public.location.location_id;
          public          postgres    false    217            �            1259    16770    location_r_no_seq    SEQUENCE     �   CREATE SEQUENCE public.location_r_no_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.location_r_no_seq;
       public          postgres    false    216            ^           0    0    location_r_no_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.location_r_no_seq OWNED BY public.location.r_no;
          public          postgres    false    218            �            1259    16771 	   privilege    TABLE       CREATE TABLE public.privilege (
    r_no integer NOT NULL,
    privilege_id character varying(200),
    privilege character varying(200),
    last_updated_by character varying(200),
    last_updated_on character varying DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.privilege;
       public         heap    postgres    false            �            1259    16777    privilege_r_no_seq    SEQUENCE     �   CREATE SEQUENCE public.privilege_r_no_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.privilege_r_no_seq;
       public          postgres    false    219            _           0    0    privilege_r_no_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.privilege_r_no_seq OWNED BY public.privilege.r_no;
          public          postgres    false    220            �            1259    16778    roles    TABLE     �   CREATE TABLE public.roles (
    r_no integer NOT NULL,
    role character varying(200),
    last_updated_by character varying(200),
    last_updated_on character varying DEFAULT CURRENT_TIMESTAMP,
    role_id character varying(100)
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    16784    roles_r_no_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_r_no_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.roles_r_no_seq;
       public          postgres    false    221            `           0    0    roles_r_no_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.roles_r_no_seq OWNED BY public.roles.r_no;
          public          postgres    false    222            �            1259    16785    site    TABLE     �  CREATE TABLE public.site (
    r_no integer NOT NULL,
    site_id character varying(200),
    site_name character varying(200),
    location_id character varying(100),
    last_updated_by character varying(200),
    last_updated_on character varying DEFAULT CURRENT_TIMESTAMP,
    company character varying(200),
    site_status character varying(50) DEFAULT '1'::character varying
);
    DROP TABLE public.site;
       public         heap    postgres    false            �            1259    16791    site_r_no_seq    SEQUENCE     �   CREATE SEQUENCE public.site_r_no_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.site_r_no_seq;
       public          postgres    false    223            a           0    0    site_r_no_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.site_r_no_seq OWNED BY public.site.r_no;
          public          postgres    false    224            �            1259    16792    site_site_id_seq    SEQUENCE     �   CREATE SEQUENCE public.site_site_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 '   DROP SEQUENCE public.site_site_id_seq;
       public          postgres    false    223            b           0    0    site_site_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.site_site_id_seq OWNED BY public.site.site_id;
          public          postgres    false    225            �            1259    16793    user    TABLE     *  CREATE TABLE public."user" (
    r_no integer NOT NULL,
    user_id character varying(200),
    first_name character varying(200),
    last_name character varying(200),
    role_id character varying(200),
    contact character varying(200),
    site_id character varying(200),
    status character varying(200) DEFAULT 1,
    active character varying(200) DEFAULT 1,
    last_updated_by character varying(200),
    last_updated_on character varying DEFAULT CURRENT_TIMESTAMP,
    email character varying(2000),
    designation character varying(2000)
);
    DROP TABLE public."user";
       public         heap    postgres    false            �            1259    16800    user_access_control    TABLE     2  CREATE TABLE public.user_access_control (
    r_no integer NOT NULL,
    site_id character varying(200),
    user_id character varying,
    site_management character varying(10),
    user_management character varying(10),
    device_management character varying(10),
    dashboard character varying(10)
);
 '   DROP TABLE public.user_access_control;
       public         heap    postgres    false            �            1259    16805    user_access_control_r_no_seq    SEQUENCE     �   CREATE SEQUENCE public.user_access_control_r_no_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.user_access_control_r_no_seq;
       public          postgres    false    227            c           0    0    user_access_control_r_no_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.user_access_control_r_no_seq OWNED BY public.user_access_control.r_no;
          public          postgres    false    228            �            1259    16806    user_credential    TABLE       CREATE TABLE public.user_credential (
    r_no integer NOT NULL,
    user_id character varying(200),
    user_name character varying(200),
    password character varying(200),
    last_updated_by character varying(200),
    last_updated_on character varying DEFAULT CURRENT_TIMESTAMP
);
 #   DROP TABLE public.user_credential;
       public         heap    postgres    false            �            1259    16812    user_credential_r_no_seq    SEQUENCE     �   CREATE SEQUENCE public.user_credential_r_no_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.user_credential_r_no_seq;
       public          postgres    false    229            d           0    0    user_credential_r_no_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.user_credential_r_no_seq OWNED BY public.user_credential.r_no;
          public          postgres    false    230            �            1259    16813    user_r_no_seq    SEQUENCE     �   CREATE SEQUENCE public.user_r_no_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.user_r_no_seq;
       public          postgres    false    226            e           0    0    user_r_no_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.user_r_no_seq OWNED BY public."user".r_no;
          public          postgres    false    231            �            1259    16814    user_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 '   DROP SEQUENCE public.user_user_id_seq;
       public          postgres    false    226            f           0    0    user_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.user_user_id_seq OWNED BY public."user".user_id;
          public          postgres    false    232            �           2604    16815    department r_no    DEFAULT     r   ALTER TABLE ONLY public.department ALTER COLUMN r_no SET DEFAULT nextval('public.department_r_no_seq'::regclass);
 >   ALTER TABLE public.department ALTER COLUMN r_no DROP DEFAULT;
       public          postgres    false    215    214            �           2604    16816    location r_no    DEFAULT     n   ALTER TABLE ONLY public.location ALTER COLUMN r_no SET DEFAULT nextval('public.location_r_no_seq'::regclass);
 <   ALTER TABLE public.location ALTER COLUMN r_no DROP DEFAULT;
       public          postgres    false    218    216            �           2604    16817    location location_id    DEFAULT     �   ALTER TABLE ONLY public.location ALTER COLUMN location_id SET DEFAULT ('LI'::text || nextval('public.location_location_id'::regclass));
 C   ALTER TABLE public.location ALTER COLUMN location_id DROP DEFAULT;
       public          postgres    false    217    216            �           2604    16818    privilege r_no    DEFAULT     p   ALTER TABLE ONLY public.privilege ALTER COLUMN r_no SET DEFAULT nextval('public.privilege_r_no_seq'::regclass);
 =   ALTER TABLE public.privilege ALTER COLUMN r_no DROP DEFAULT;
       public          postgres    false    220    219            �           2604    16819 
   roles r_no    DEFAULT     h   ALTER TABLE ONLY public.roles ALTER COLUMN r_no SET DEFAULT nextval('public.roles_r_no_seq'::regclass);
 9   ALTER TABLE public.roles ALTER COLUMN r_no DROP DEFAULT;
       public          postgres    false    222    221            �           2604    16820 	   site r_no    DEFAULT     f   ALTER TABLE ONLY public.site ALTER COLUMN r_no SET DEFAULT nextval('public.site_r_no_seq'::regclass);
 8   ALTER TABLE public.site ALTER COLUMN r_no DROP DEFAULT;
       public          postgres    false    224    223            �           2604    16821    site site_id    DEFAULT     |   ALTER TABLE ONLY public.site ALTER COLUMN site_id SET DEFAULT ('SI'::text || nextval('public.site_site_id_seq'::regclass));
 ;   ALTER TABLE public.site ALTER COLUMN site_id DROP DEFAULT;
       public          postgres    false    225    223            �           2604    16822 	   user r_no    DEFAULT     h   ALTER TABLE ONLY public."user" ALTER COLUMN r_no SET DEFAULT nextval('public.user_r_no_seq'::regclass);
 :   ALTER TABLE public."user" ALTER COLUMN r_no DROP DEFAULT;
       public          postgres    false    231    226            �           2604    16823    user user_id    DEFAULT     ~   ALTER TABLE ONLY public."user" ALTER COLUMN user_id SET DEFAULT ('UI'::text || nextval('public.user_user_id_seq'::regclass));
 =   ALTER TABLE public."user" ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    232    226            �           2604    16824    user_access_control r_no    DEFAULT     �   ALTER TABLE ONLY public.user_access_control ALTER COLUMN r_no SET DEFAULT nextval('public.user_access_control_r_no_seq'::regclass);
 G   ALTER TABLE public.user_access_control ALTER COLUMN r_no DROP DEFAULT;
       public          postgres    false    228    227            �           2604    16825    user_credential r_no    DEFAULT     |   ALTER TABLE ONLY public.user_credential ALTER COLUMN r_no SET DEFAULT nextval('public.user_credential_r_no_seq'::regclass);
 C   ALTER TABLE public.user_credential ALTER COLUMN r_no DROP DEFAULT;
       public          postgres    false    230    229            C          0    16756 
   department 
   TABLE DATA           l   COPY public.department (r_no, department_name, last_updated_by, last_updated_on, department_id) FROM stdin;
    public          postgres    false    214   RZ       E          0    16763    location 
   TABLE DATA           o   COPY public.location (r_no, location_id, location_name, last_updated_by, last_updated_on, address) FROM stdin;
    public          postgres    false    216   oZ       H          0    16771 	   privilege 
   TABLE DATA           d   COPY public.privilege (r_no, privilege_id, privilege, last_updated_by, last_updated_on) FROM stdin;
    public          postgres    false    219   �Z       J          0    16778    roles 
   TABLE DATA           V   COPY public.roles (r_no, role, last_updated_by, last_updated_on, role_id) FROM stdin;
    public          postgres    false    221   �Z       L          0    16785    site 
   TABLE DATA           }   COPY public.site (r_no, site_id, site_name, location_id, last_updated_by, last_updated_on, company, site_status) FROM stdin;
    public          postgres    false    223   4[       O          0    16793    user 
   TABLE DATA           �   COPY public."user" (r_no, user_id, first_name, last_name, role_id, contact, site_id, status, active, last_updated_by, last_updated_on, email, designation) FROM stdin;
    public          postgres    false    226   Q[       P          0    16800    user_access_control 
   TABLE DATA           �   COPY public.user_access_control (r_no, site_id, user_id, site_management, user_management, device_management, dashboard) FROM stdin;
    public          postgres    false    227   �[       R          0    16806    user_credential 
   TABLE DATA           o   COPY public.user_credential (r_no, user_id, user_name, password, last_updated_by, last_updated_on) FROM stdin;
    public          postgres    false    229   �[       g           0    0    department_r_no_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.department_r_no_seq', 1, false);
          public          postgres    false    215            h           0    0    location_location_id    SEQUENCE SET     C   SELECT pg_catalog.setval('public.location_location_id', 1, false);
          public          postgres    false    217            i           0    0    location_r_no_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.location_r_no_seq', 1, false);
          public          postgres    false    218            j           0    0    privilege_r_no_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.privilege_r_no_seq', 1, false);
          public          postgres    false    220            k           0    0    roles_r_no_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.roles_r_no_seq', 1, false);
          public          postgres    false    222            l           0    0    site_r_no_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.site_r_no_seq', 1, false);
          public          postgres    false    224            m           0    0    site_site_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.site_site_id_seq', 1, false);
          public          postgres    false    225            n           0    0    user_access_control_r_no_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.user_access_control_r_no_seq', 1, true);
          public          postgres    false    228            o           0    0    user_credential_r_no_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.user_credential_r_no_seq', 1, true);
          public          postgres    false    230            p           0    0    user_r_no_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.user_r_no_seq', 1, true);
          public          postgres    false    231            q           0    0    user_user_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.user_user_id_seq', 1, true);
          public          postgres    false    232            �           2606    16827    department department_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (r_no);
 D   ALTER TABLE ONLY public.department DROP CONSTRAINT department_pkey;
       public            postgres    false    214            �           2606    16829    location location_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (r_no);
 @   ALTER TABLE ONLY public.location DROP CONSTRAINT location_pkey;
       public            postgres    false    216            �           2606    16831    privilege privilege_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.privilege
    ADD CONSTRAINT privilege_pkey PRIMARY KEY (r_no);
 B   ALTER TABLE ONLY public.privilege DROP CONSTRAINT privilege_pkey;
       public            postgres    false    219            �           2606    16833    roles roles_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (r_no);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            postgres    false    221            �           2606    16835    site site_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.site
    ADD CONSTRAINT site_pkey PRIMARY KEY (r_no);
 8   ALTER TABLE ONLY public.site DROP CONSTRAINT site_pkey;
       public            postgres    false    223            �           2606    17385    user uc_email 
   CONSTRAINT     K   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT uc_email UNIQUE (email);
 9   ALTER TABLE ONLY public."user" DROP CONSTRAINT uc_email;
       public            postgres    false    226            �           2606    16837 ,   user_access_control user_access_control_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.user_access_control
    ADD CONSTRAINT user_access_control_pkey PRIMARY KEY (r_no);
 V   ALTER TABLE ONLY public.user_access_control DROP CONSTRAINT user_access_control_pkey;
       public            postgres    false    227            �           2606    16839 $   user_credential user_credential_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.user_credential
    ADD CONSTRAINT user_credential_pkey PRIMARY KEY (r_no);
 N   ALTER TABLE ONLY public.user_credential DROP CONSTRAINT user_credential_pkey;
       public            postgres    false    229            �           2606    16841    user user_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (r_no);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public            postgres    false    226            �           2620    16843    user sync_user_id_trigger    TRIGGER     �   CREATE TRIGGER sync_user_id_trigger AFTER INSERT OR UPDATE ON public."user" FOR EACH ROW EXECUTE FUNCTION public.sync_user_id_in_credentials();
 4   DROP TRIGGER sync_user_id_trigger ON public."user";
       public          postgres    false    234    226            C      x������ � �      E      x������ � �      H      x������ � �      J   {   x�}ͫ�0@Q���z��}%ٍ����DT��QDL1ם��m}>��.����e�2�ĕJ%�F��0U�p�	�G/��ړjQ��k'$��O����Y9#wR@7���*%&O���
� _f]6�      L      x������ � �      O   q   x�-�1�0�_ѽ���5:uu-��j�	��`����Ɓ���??��F����t��g��x̋+��T����3z����5O4�ܫ�7���9'��k�CQ�VJ� 	�      P      x�3�,I�-���4�4CC�=... L��      R   N   x�3��4�LL���sH�M���K���t�9�2�3�R8���u,t������-,��L��=... ��     