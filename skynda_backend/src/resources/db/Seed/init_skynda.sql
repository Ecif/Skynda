--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

-- Started on 2016-11-06 15:13:28

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner:
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2342 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 190 (class 1259 OID 90734)
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE address (
    id integer NOT NULL,
    linn character varying(100) NOT NULL,
    maakond character varying(100),
    vald character varying(100),
    street character varying(100) NOT NULL,
    house_number_name character varying(100) NOT NULL,
    apartment_nr character varying(50) NOT NULL,
    postal_code character varying(50)
);


ALTER TABLE address OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 90732)
-- Name: addresses_address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE addresses_address_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE addresses_address_id_seq OWNER TO postgres;

--
-- TOC entry 2343 (class 0 OID 0)
-- Dependencies: 189
-- Name: addresses_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE addresses_address_id_seq OWNED BY address.id;


--
-- TOC entry 214 (class 1259 OID 91112)
-- Name: authority; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE authority (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    archived time without time zone
);


ALTER TABLE authority OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 91110)
-- Name: authority_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE authority_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE authority_id_seq OWNER TO postgres;

--
-- TOC entry 2344 (class 0 OID 0)
-- Dependencies: 213
-- Name: authority_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE authority_id_seq OWNED BY authority.id;


--
-- TOC entry 206 (class 1259 OID 91001)
-- Name: vehicle_description; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_description (
    id integer NOT NULL,
    title character varying(100),
    content text,
    archived time without time zone
);


ALTER TABLE vehicle_description OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 90999)
-- Name: car_description_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_description_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE car_description_id_seq OWNER TO postgres;

--
-- TOC entry 2345 (class 0 OID 0)
-- Dependencies: 205
-- Name: car_description_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_description_id_seq OWNED BY vehicle_description.id;


--
-- TOC entry 202 (class 1259 OID 90935)
-- Name: vehicle_fault; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_fault (
    id integer NOT NULL,
    image_url character varying(100),
    text character varying(100),
    vehicle_id integer NOT NULL,
    archived time without time zone
);


ALTER TABLE vehicle_fault OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 90933)
-- Name: car_fault_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_fault_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE car_fault_id_seq OWNER TO postgres;

--
-- TOC entry 2346 (class 0 OID 0)
-- Dependencies: 201
-- Name: car_fault_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_fault_id_seq OWNED BY vehicle_fault.id;


--
-- TOC entry 200 (class 1259 OID 90924)
-- Name: vehicle_feature; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_feature (
    id integer NOT NULL,
    text character varying(100),
    vehicle_id integer NOT NULL,
    archived time without time zone
);


ALTER TABLE vehicle_feature OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 90922)
-- Name: car_feature_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_feature_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE car_feature_id_seq OWNER TO postgres;

--
-- TOC entry 2347 (class 0 OID 0)
-- Dependencies: 199
-- Name: car_feature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_feature_id_seq OWNED BY vehicle_feature.id;


--
-- TOC entry 198 (class 1259 OID 90913)
-- Name: vehicle_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_image (
    id integer NOT NULL,
    image_url character varying(100),
    vehicle_id integer,
    archived time without time zone
);


ALTER TABLE vehicle_image OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 90911)
-- Name: car_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_image_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE car_image_id_seq OWNER TO postgres;

--
-- TOC entry 2348 (class 0 OID 0)
-- Dependencies: 197
-- Name: car_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_image_id_seq OWNED BY vehicle_image.id;


--
-- TOC entry 204 (class 1259 OID 90983)
-- Name: vehicle_model; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_model (
    id integer NOT NULL,
    model_code character varying(100) NOT NULL,
    description text,
    vehicle_manufacturer_id integer NOT NULL,
    title character varying(255),
    engine character varying(100) NOT NULL,
    horse_power integer,
    doors integer NOT NULL,
    seats character varying(50) NOT NULL,
    year integer NOT NULL,
    archived time without time zone,
    transmission_id integer NOT NULL,
    drivetrain_id integer NOT NULL,
    vehicle_body_id integer NOT NULL,
    fuel_type_id integer NOT NULL
);


ALTER TABLE vehicle_model OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 90981)
-- Name: car_model_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_model_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE car_model_id_seq OWNER TO postgres;

--
-- TOC entry 2349 (class 0 OID 0)
-- Dependencies: 203
-- Name: car_model_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_model_id_seq OWNED BY vehicle_model.id;


--
-- TOC entry 194 (class 1259 OID 90770)
-- Name: vehicle_report; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_report (
    id integer NOT NULL,
    vehicle_id integer NOT NULL,
    title character varying(50),
    is_pass boolean,
    points_text text,
    faults_text text,
    fauls_img text,
    archived time without time zone
);


ALTER TABLE vehicle_report OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 90768)
-- Name: car_report_report_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_report_report_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE car_report_report_id_seq OWNER TO postgres;

--
-- TOC entry 2350 (class 0 OID 0)
-- Dependencies: 193
-- Name: car_report_report_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_report_report_id_seq OWNED BY vehicle_report.id;


--
-- TOC entry 196 (class 1259 OID 90779)
-- Name: vehicle_review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle_review (
    id integer NOT NULL,
    vehicle_id integer NOT NULL,
    logo_url character varying(255),
    video_url character varying(255),
    text text,
    rating integer,
    archived time without time zone
);


ALTER TABLE vehicle_review OWNER TO postgres;

--
-- TOC entry 195 (class 1259 OID 90777)
-- Name: car_review_review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE car_review_review_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE car_review_review_id_seq OWNER TO postgres;

--
-- TOC entry 2351 (class 0 OID 0)
-- Dependencies: 195
-- Name: car_review_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE car_review_review_id_seq OWNED BY vehicle_review.id;


--
-- TOC entry 192 (class 1259 OID 90761)
-- Name: vehicle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE vehicle (
    id integer NOT NULL,
    vin_code character varying(100) NOT NULL,
    price numeric(10,2) NOT NULL,
    created timestamp without time zone NOT NULL,
    registration_number character varying(100) NOT NULL,
    mileage numeric(18,2) NOT NULL,
    color_outside character varying(100) NOT NULL,
    color_inside character varying(100) NOT NULL,
    fuel_city character varying(100),
    fuel_highway character varying(100),
    problems text,
    compression_ratio integer,
    compression_type character varying(50),
    configuration character varying(50),
    cylinders character varying(50),
    displacement character varying(50),
    size integer,
    torque integer,
    total_valves integer,
    safety_stars integer,
    additional character varying(500),
    archived time without time zone,
    vehicle_model_id integer,
    owner_id integer NOT NULL
);


ALTER TABLE vehicle OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 90759)
-- Name: cars_for_sale_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE cars_for_sale_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE cars_for_sale_id_seq OWNER TO postgres;

--
-- TOC entry 2352 (class 0 OID 0)
-- Dependencies: 191
-- Name: cars_for_sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE cars_for_sale_id_seq OWNED BY vehicle.id;


--
-- TOC entry 188 (class 1259 OID 90722)
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE payment (
    id integer NOT NULL,
    vehicle_id integer NOT NULL,
    agreed_price numeric(10,2),
    customer_id integer NOT NULL,
    date_sold timestamp without time zone,
    monthly_payment_amount numeric(10,2),
    monthly_payment_date timestamp without time zone,
    archived time without time zone,
    payment_type_id integer NOT NULL,
    payment_start_date timestamp without time zone,
    payment_end_date timestamp without time zone,
    finance_company_id integer,
    payment_status_id integer
);


ALTER TABLE payment OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 90720)
-- Name: cars_sold_car_sold_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE cars_sold_car_sold_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE cars_sold_car_sold_id_seq OWNER TO postgres;

--
-- TOC entry 2353 (class 0 OID 0)
-- Dependencies: 187
-- Name: cars_sold_car_sold_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE cars_sold_car_sold_id_seq OWNED BY payment.id;


--
-- TOC entry 211 (class 1259 OID 91082)
-- Name: classification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE classification (
    id integer NOT NULL,
    description text,
    is_imported boolean NOT NULL,
    weight integer,
    value text,
    modifier_user_id integer NOT NULL,
    modifier_user_ip inet NOT NULL,
    archived timestamp without time zone,
    name character varying(150),
    classification_type_id integer NOT NULL,
    is_active boolean DEFAULT true,
    value2 text
);


ALTER TABLE classification OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 91080)
-- Name: classification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE classification_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE classification_id_seq OWNER TO postgres;

--
-- TOC entry 2354 (class 0 OID 0)
-- Dependencies: 210
-- Name: classification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE classification_id_seq OWNED BY classification.id;


--
-- TOC entry 209 (class 1259 OID 91068)
-- Name: classification_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE classification_type (
    id integer NOT NULL,
    name character varying(150),
    description text,
    modifier_user_id integer NOT NULL,
    modifier_user_ip inet NOT NULL,
    archived timestamp without time zone
);


ALTER TABLE classification_type OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 91066)
-- Name: classification_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE classification_type_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE classification_type_id_seq OWNER TO postgres;

--
-- TOC entry 2355 (class 0 OID 0)
-- Dependencies: 208
-- Name: classification_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE classification_type_id_seq OWNED BY classification_type.id;


--
-- TOC entry 184 (class 1259 OID 90698)
-- Name: finance_company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE finance_company (
    finance_company_name character varying(100),
    id integer NOT NULL,
    name character varying(100),
    archived time without time zone
);


ALTER TABLE finance_company OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 91028)
-- Name: finance_company_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE finance_company_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE finance_company_id_seq OWNER TO postgres;

--
-- TOC entry 2356 (class 0 OID 0)
-- Dependencies: 207
-- Name: finance_company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE finance_company_id_seq OWNED BY finance_company.id;


--
-- TOC entry 183 (class 1259 OID 90692)
-- Name: insurance_company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE insurance_company (
    id integer NOT NULL,
    insurance_company_name character varying(100),
    archived time without time zone
);


ALTER TABLE insurance_company OWNER TO postgres;

--
-- TOC entry 182 (class 1259 OID 90690)
-- Name: insurance_companies_insurance_company_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE insurance_companies_insurance_company_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE insurance_companies_insurance_company_id_seq OWNER TO postgres;

--
-- TOC entry 2357 (class 0 OID 0)
-- Dependencies: 182
-- Name: insurance_companies_insurance_company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE insurance_companies_insurance_company_id_seq OWNED BY insurance_company.id;


--
-- TOC entry 186 (class 1259 OID 90704)
-- Name: insurance_policy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE insurance_policy (
    id integer NOT NULL,
    car_sold_id integer,
    policy_start_date timestamp without time zone,
    policy_renewal_date timestamp without time zone,
    monthly_payments numeric(10,2),
    insurance_company_id integer,
    archived time without time zone
);


ALTER TABLE insurance_policy OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 90702)
-- Name: insurance_policies_policy_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE insurance_policies_policy_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE insurance_policies_policy_id_seq OWNER TO postgres;

--
-- TOC entry 2358 (class 0 OID 0)
-- Dependencies: 185
-- Name: insurance_policies_policy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE insurance_policies_policy_id_seq OWNED BY insurance_policy.id;


--
-- TOC entry 212 (class 1259 OID 91104)
-- Name: token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE token (
    series character varying(50) NOT NULL,
    value character varying(50),
    date timestamp without time zone,
    ip_address character varying(50),
    user_agent character varying(200),
    user_login character varying(50)
);


ALTER TABLE token OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 91128)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "user" (
    id integer NOT NULL,
    login character varying(45) NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    phone character varying(255),
    language character(2),
    email character varying(255) NOT NULL,
    password character varying(100) NOT NULL,
    enabled boolean,
    archived timestamp without time zone
);


ALTER TABLE "user" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 91120)
-- Name: user_authority; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE user_authority (
    id integer NOT NULL,
    user_id bigint NOT NULL,
    authority_id bigint NOT NULL,
    archived time without time zone
);


ALTER TABLE user_authority OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 91118)
-- Name: user_authority_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_authority_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE user_authority_id_seq OWNER TO postgres;

--
-- TOC entry 2359 (class 0 OID 0)
-- Dependencies: 215
-- Name: user_authority_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_authority_id_seq OWNED BY user_authority.id;


--
-- TOC entry 217 (class 1259 OID 91126)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
CACHE 1;


ALTER TABLE user_id_seq OWNER TO postgres;

--
-- TOC entry 2360 (class 0 OID 0)
-- Dependencies: 217
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- TOC entry 2106 (class 2604 OID 90737)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address ALTER COLUMN id SET DEFAULT nextval('addresses_address_id_seq'::regclass);


--
-- TOC entry 2118 (class 2604 OID 91115)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY authority ALTER COLUMN id SET DEFAULT nextval('authority_id_seq'::regclass);


--
-- TOC entry 2116 (class 2604 OID 91085)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification ALTER COLUMN id SET DEFAULT nextval('classification_id_seq'::regclass);


--
-- TOC entry 2115 (class 2604 OID 91071)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification_type ALTER COLUMN id SET DEFAULT nextval('classification_type_id_seq'::regclass);


--
-- TOC entry 2103 (class 2604 OID 91030)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY finance_company ALTER COLUMN id SET DEFAULT nextval('finance_company_id_seq'::regclass);


--
-- TOC entry 2102 (class 2604 OID 90695)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_company ALTER COLUMN id SET DEFAULT nextval('insurance_companies_insurance_company_id_seq'::regclass);


--
-- TOC entry 2104 (class 2604 OID 90707)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policy ALTER COLUMN id SET DEFAULT nextval('insurance_policies_policy_id_seq'::regclass);


--
-- TOC entry 2105 (class 2604 OID 90725)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment ALTER COLUMN id SET DEFAULT nextval('cars_sold_car_sold_id_seq'::regclass);


--
-- TOC entry 2120 (class 2604 OID 91131)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 2119 (class 2604 OID 91123)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_authority ALTER COLUMN id SET DEFAULT nextval('user_authority_id_seq'::regclass);


--
-- TOC entry 2107 (class 2604 OID 90764)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle ALTER COLUMN id SET DEFAULT nextval('cars_for_sale_id_seq'::regclass);


--
-- TOC entry 2114 (class 2604 OID 91004)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_description ALTER COLUMN id SET DEFAULT nextval('car_description_id_seq'::regclass);


--
-- TOC entry 2112 (class 2604 OID 90938)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_fault ALTER COLUMN id SET DEFAULT nextval('car_fault_id_seq'::regclass);


--
-- TOC entry 2111 (class 2604 OID 90927)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_feature ALTER COLUMN id SET DEFAULT nextval('car_feature_id_seq'::regclass);


--
-- TOC entry 2110 (class 2604 OID 90916)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_image ALTER COLUMN id SET DEFAULT nextval('car_image_id_seq'::regclass);


--
-- TOC entry 2113 (class 2604 OID 90986)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model ALTER COLUMN id SET DEFAULT nextval('car_model_id_seq'::regclass);


--
-- TOC entry 2108 (class 2604 OID 90773)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_report ALTER COLUMN id SET DEFAULT nextval('car_report_report_id_seq'::regclass);


--
-- TOC entry 2109 (class 2604 OID 90782)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_review ALTER COLUMN id SET DEFAULT nextval('car_review_review_id_seq'::regclass);


--
-- TOC entry 2161 (class 2606 OID 90953)
-- Name: PK_car_fault; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_fault
    ADD CONSTRAINT "PK_car_fault" PRIMARY KEY (id);


--
-- TOC entry 2158 (class 2606 OID 90951)
-- Name: PK_car_feature; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_feature
    ADD CONSTRAINT "PK_car_feature" PRIMARY KEY (id);


--
-- TOC entry 2146 (class 2606 OID 90822)
-- Name: PK_car_for_sale; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT "PK_car_for_sale" PRIMARY KEY (id);


--
-- TOC entry 2155 (class 2606 OID 90945)
-- Name: PK_car_image; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_image
    ADD CONSTRAINT "PK_car_image" PRIMARY KEY (id);


--
-- TOC entry 2179 (class 2606 OID 91091)
-- Name: PK_classification; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification
    ADD CONSTRAINT "PK_classification" PRIMARY KEY (id);


--
-- TOC entry 2173 (class 2606 OID 91076)
-- Name: PK_classification_type; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification_type
    ADD CONSTRAINT "PK_classification_type" PRIMARY KEY (id);


--
-- TOC entry 2129 (class 2606 OID 91036)
-- Name: PK_finance_company; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY finance_company
    ADD CONSTRAINT "PK_finance_company" PRIMARY KEY (id);


--
-- TOC entry 2127 (class 2606 OID 90787)
-- Name: PK_insurance_companies; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_company
    ADD CONSTRAINT "PK_insurance_companies" PRIMARY KEY (id);


--
-- TOC entry 2133 (class 2606 OID 90793)
-- Name: PK_insurance_policies; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policy
    ADD CONSTRAINT "PK_insurance_policies" PRIMARY KEY (id);


--
-- TOC entry 2168 (class 2606 OID 90991)
-- Name: PK_vehicle_model; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "PK_vehicle_model" PRIMARY KEY (id);


--
-- TOC entry 2149 (class 2606 OID 90949)
-- Name: PK_vehicle_report; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_report
    ADD CONSTRAINT "PK_vehicle_report" PRIMARY KEY (id);


--
-- TOC entry 2152 (class 2606 OID 90947)
-- Name: PK_vehicle_review; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_review
    ADD CONSTRAINT "PK_vehicle_review" PRIMARY KEY (id);


--
-- TOC entry 2140 (class 2606 OID 90803)
-- Name: PK_vehicle_sold; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "PK_vehicle_sold" PRIMARY KEY (id);


--
-- TOC entry 2186 (class 2606 OID 91154)
-- Name: UNIQUE_auth_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY authority
    ADD CONSTRAINT "UNIQUE_auth_name" UNIQUE (name);


--
-- TOC entry 2175 (class 2606 OID 91078)
-- Name: UNIQUE_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification_type
    ADD CONSTRAINT "UNIQUE_name" UNIQUE (name);


--
-- TOC entry 2181 (class 2606 OID 91103)
-- Name: UNIQUE_row; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification
    ADD CONSTRAINT "UNIQUE_row" UNIQUE (value, value2, classification_type_id);


--
-- TOC entry 2142 (class 2606 OID 90810)
-- Name: address_pkey_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY address
    ADD CONSTRAINT address_pkey_id PRIMARY KEY (id);


--
-- TOC entry 2188 (class 2606 OID 91117)
-- Name: authority_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY authority
    ADD CONSTRAINT authority_pkey PRIMARY KEY (id);


--
-- TOC entry 2170 (class 2606 OID 91009)
-- Name: car_description_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_description
    ADD CONSTRAINT car_description_pkey PRIMARY KEY (id);

-- TOC entry 2184 (class 2606 OID 91108)
-- Name: token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY token
    ADD CONSTRAINT token_pkey PRIMARY KEY (series);


--
-- TOC entry 2192 (class 2606 OID 91125)
-- Name: user_authority_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_authority
    ADD CONSTRAINT user_authority_pkey PRIMARY KEY (id);


--
-- TOC entry 2194 (class 2606 OID 91140)
-- Name: user_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- TOC entry 2196 (class 2606 OID 91138)
-- Name: user_login_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_login_key UNIQUE (login);


--
-- TOC entry 2198 (class 2606 OID 91136)
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2189 (class 1259 OID 91152)
-- Name: FKI_authority_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_authority_id" ON user_authority USING btree (authority_id);


--
-- TOC entry 2130 (class 1259 OID 91048)
-- Name: FKI_car_sold_id_insurance_policy; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_car_sold_id_insurance_policy" ON insurance_policy USING btree (car_sold_id);


--
-- TOC entry 2176 (class 1259 OID 91100)
-- Name: FKI_classification_type_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_classification_type_id" ON classification USING btree (classification_type_id);


--
-- TOC entry 2134 (class 1259 OID 90801)
-- Name: FKI_customer_id_car_sold; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_customer_id_car_sold" ON payment USING btree (customer_id);


--
-- TOC entry 2162 (class 1259 OID 91186)
-- Name: FKI_drivetrain_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_drivetrain_id" ON vehicle_model USING btree (drivetrain_id);


--
-- TOC entry 2135 (class 1259 OID 91222)
-- Name: FKI_finance_company_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_finance_company_id" ON payment USING btree (finance_company_id);


--
-- TOC entry 2163 (class 1259 OID 91198)
-- Name: FKI_fuel_type_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_fuel_type_id" ON vehicle_model USING btree (fuel_type_id);


--
-- TOC entry 2131 (class 1259 OID 91049)
-- Name: FKI_insurance_company_id_insurance_policy; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_insurance_company_id_insurance_policy" ON insurance_policy USING btree (insurance_company_id);


--
-- TOC entry 2143 (class 1259 OID 91204)
-- Name: FKI_owner_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_owner_id" ON vehicle USING btree (owner_id);


--
-- TOC entry 2136 (class 1259 OID 91216)
-- Name: FKI_payment_status_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_payment_status_id" ON payment USING btree (payment_status_id);


--
-- TOC entry 2137 (class 1259 OID 91210)
-- Name: FKI_payment_type_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_payment_type_id" ON payment USING btree (payment_type_id);


--
-- TOC entry 2164 (class 1259 OID 91174)
-- Name: FKI_transmission_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_transmission_id" ON vehicle_model USING btree (transmission_id);


--
-- TOC entry 2190 (class 1259 OID 91146)
-- Name: FKI_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_user_id" ON user_authority USING btree (user_id);


--
-- TOC entry 2165 (class 1259 OID 91180)
-- Name: FKI_vehicle_body_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_body_id" ON vehicle_model USING btree (vehicle_body_id);


--
-- TOC entry 2159 (class 1259 OID 91010)
-- Name: FKI_vehicle_id_car_fault; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_fault" ON vehicle_fault USING btree (vehicle_id);


--
-- TOC entry 2156 (class 1259 OID 91011)
-- Name: FKI_vehicle_id_car_feature; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_feature" ON vehicle_feature USING btree (vehicle_id);


--
-- TOC entry 2153 (class 1259 OID 91026)
-- Name: FKI_vehicle_id_car_image; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_image" ON vehicle_image USING btree (vehicle_id);


--
-- TOC entry 2147 (class 1259 OID 91043)
-- Name: FKI_vehicle_id_car_report; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_report" ON vehicle_report USING btree (vehicle_id);


--
-- TOC entry 2150 (class 1259 OID 91044)
-- Name: FKI_vehicle_id_car_review; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_review" ON vehicle_review USING btree (vehicle_id);


--
-- TOC entry 2138 (class 1259 OID 90800)
-- Name: FKI_vehicle_id_car_sold; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_id_car_sold" ON payment USING btree (vehicle_id);


--
-- TOC entry 2166 (class 1259 OID 91173)
-- Name: FKI_vehicle_manufacturer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_manufacturer_id" ON vehicle_model USING btree (vehicle_manufacturer_id);


--
-- TOC entry 2144 (class 1259 OID 91192)
-- Name: FKI_vehicle_model_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FKI_vehicle_model_id" ON vehicle USING btree (vehicle_model_id);


--
-- TOC entry 2177 (class 1259 OID 91101)
-- Name: FK_modifier_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "FK_modifier_user_id" ON classification USING btree (modifier_user_id);


--
-- TOC entry 2171 (class 1259 OID 91079)
-- Name: I_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "I_name" ON classification_type USING btree (name);


--
-- TOC entry 2182 (class 1259 OID 91099)
-- Name: classification_value_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX classification_value_idx ON classification USING hash (value);


--
-- TOC entry 2220 (class 2606 OID 91147)
-- Name: FK_authority_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_authority
    ADD CONSTRAINT "FK_authority_id" FOREIGN KEY (authority_id) REFERENCES authority(id);


--
-- TOC entry 2199 (class 2606 OID 90823)
-- Name: FK_car_sold_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policy
    ADD CONSTRAINT "FK_car_sold_id" FOREIGN KEY (car_sold_id) REFERENCES payment(id);


--
-- TOC entry 2218 (class 2606 OID 91094)
-- Name: FK_classification_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY classification
    ADD CONSTRAINT "FK_classification_type_id" FOREIGN KEY (classification_type_id) REFERENCES classification_type(id);


--
-- TOC entry 2205 (class 2606 OID 91223)
-- Name: FK_customer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "FK_customer_id" FOREIGN KEY (customer_id) REFERENCES "user"(id);


--
-- TOC entry 2216 (class 2606 OID 91181)
-- Name: FK_drivetrain_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_drivetrain_id" FOREIGN KEY (drivetrain_id) REFERENCES classification(id);


--
-- TOC entry 2204 (class 2606 OID 91217)
-- Name: FK_finance_company_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "FK_finance_company_id" FOREIGN KEY (finance_company_id) REFERENCES finance_company(id);


--
-- TOC entry 2217 (class 2606 OID 91193)
-- Name: FK_fuel_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_fuel_type_id" FOREIGN KEY (fuel_type_id) REFERENCES classification(id);


--
-- TOC entry 2200 (class 2606 OID 90828)
-- Name: FK_insurance_company_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY insurance_policy
    ADD CONSTRAINT "FK_insurance_company_id" FOREIGN KEY (insurance_company_id) REFERENCES insurance_company(id);


--
-- TOC entry 2207 (class 2606 OID 91199)
-- Name: FK_owner_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT "FK_owner_id" FOREIGN KEY (owner_id) REFERENCES "user"(id);


--
-- TOC entry 2203 (class 2606 OID 91211)
-- Name: FK_payment_status_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "FK_payment_status_id" FOREIGN KEY (payment_status_id) REFERENCES classification(id);


--
-- TOC entry 2202 (class 2606 OID 91205)
-- Name: FK_payment_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "FK_payment_type_id" FOREIGN KEY (payment_type_id) REFERENCES classification(id);


--
-- TOC entry 2213 (class 2606 OID 91162)
-- Name: FK_transmission_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_transmission_id" FOREIGN KEY (transmission_id) REFERENCES classification(id);


--
-- TOC entry 2219 (class 2606 OID 91141)
-- Name: FK_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_authority
    ADD CONSTRAINT "FK_user_id" FOREIGN KEY (user_id) REFERENCES "user"(id);


--
-- TOC entry 2215 (class 2606 OID 91175)
-- Name: FK_vehicle_body_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_vehicle_body_id" FOREIGN KEY (vehicle_body_id) REFERENCES classification(id);


--
-- TOC entry 2201 (class 2606 OID 90843)
-- Name: FK_vehicle_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY payment
    ADD CONSTRAINT "FK_vehicle_id" FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);


--
-- TOC entry 2208 (class 2606 OID 90888)
-- Name: FK_vehicle_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_report
    ADD CONSTRAINT "FK_vehicle_id" FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);


--
-- TOC entry 2209 (class 2606 OID 90893)
-- Name: FK_vehicle_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_review
    ADD CONSTRAINT "FK_vehicle_id" FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);


--
-- TOC entry 2210 (class 2606 OID 90917)
-- Name: FK_vehicle_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_image
    ADD CONSTRAINT "FK_vehicle_id" FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);


--
-- TOC entry 2211 (class 2606 OID 90928)
-- Name: FK_vehicle_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_feature
    ADD CONSTRAINT "FK_vehicle_id" FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);


--
-- TOC entry 2212 (class 2606 OID 90939)
-- Name: FK_vehicle_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_fault
    ADD CONSTRAINT "FK_vehicle_id" FOREIGN KEY (vehicle_id) REFERENCES vehicle(id);


--
-- TOC entry 2214 (class 2606 OID 91168)
-- Name: FK_vehicle_manufacturer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle_model
    ADD CONSTRAINT "FK_vehicle_manufacturer_id" FOREIGN KEY (vehicle_manufacturer_id) REFERENCES classification(id);


--
-- TOC entry 2206 (class 2606 OID 91187)
-- Name: FK_vehicle_model_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY vehicle
    ADD CONSTRAINT "FK_vehicle_model_id" FOREIGN KEY (vehicle_model_id) REFERENCES vehicle_model(id);


--
-- TOC entry 2341 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-11-06 15:13:29

--
-- PostgreSQL database dump complete
--

