
ALTER TABLE vehicle_feature
	DROP CONSTRAINT "FK_feature_id";

CREATE SEQUENCE feature_id_seq
	START WITH 1
	INCREMENT BY 1
	NO MAXVALUE
	NO MINVALUE
	CACHE 1;

CREATE TABLE feature (
	weight integer,
	"value" text,
	modifier_user_id integer NOT NULL,
	modifier_user_ip inet NOT NULL,
	name character varying(255),
	is_active boolean DEFAULT true,
	archived timestamp without time zone,
	id integer DEFAULT nextval('feature_id_seq'::regclass) NOT NULL
);

ALTER SEQUENCE feature_id_seq
	OWNED BY feature.id;

ALTER TABLE feature
	ADD CONSTRAINT "PK_feature" PRIMARY KEY (id);

ALTER TABLE vehicle_feature
	ADD CONSTRAINT "FK_feature_id" FOREIGN KEY (feature_id) REFERENCES feature(id);

ALTER TABLE vehicle_model
	ADD CONSTRAINT "UNIQUE_model" UNIQUE (model_code, vehicle_manufacturer_id, title);

ALTER TABLE feature
	ADD CONSTRAINT "UNIQUE_feature_row" UNIQUE (value, name);
