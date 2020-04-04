--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: favourites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favourites (
    recipe_id integer NOT NULL,
    email character varying(50) NOT NULL,
    "createdAt" date,
    "updatedAt" date
);


ALTER TABLE public.favourites OWNER TO postgres;

--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredients (
    ingredient_id integer NOT NULL,
    recipe_id integer NOT NULL,
    name character varying(150)[] NOT NULL
);


ALTER TABLE public.ingredients OWNER TO postgres;

--
-- Name: ingredients_ingredient_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingredients_ingredient_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingredients_ingredient_id_seq OWNER TO postgres;

--
-- Name: ingredients_ingredient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredients_ingredient_id_seq OWNED BY public.ingredients.ingredient_id;


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipes (
    recipe_id integer NOT NULL,
    title character varying(100) NOT NULL,
    rating double precision,
    fat integer,
    calories integer,
    protein integer,
    sodium integer,
    description text,
    "createdAt" date,
    "updatedAt" date,
    ingredients text[],
    steps text[],
    categories text[]
);


ALTER TABLE public.recipes OWNER TO postgres;

--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipes_recipe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipes_recipe_id_seq OWNER TO postgres;

--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipes_recipe_id_seq OWNED BY public.recipes.recipe_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    email character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    "createdAt" date,
    "updatedAt" date
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: ingredients ingredient_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN ingredient_id SET DEFAULT nextval('public.ingredients_ingredient_id_seq'::regclass);


--
-- Name: recipes recipe_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes ALTER COLUMN recipe_id SET DEFAULT nextval('public.recipes_recipe_id_seq'::regclass);


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredients (ingredient_id, recipe_id, name) FROM stdin;
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (email, password, "createdAt", "updatedAt") FROM stdin;
matthewfollegot@gmail.com	$2b$10$EZy8Y2qIdrMFgD.tSu83G.aZNqybVuyMOnstgZNA7/V1YUaBFsNXe	2020-04-03	2020-04-03
ryanhow@gmail.com	$2b$10$xEDqmCXzAXXS9nK1Y1smeujylHwBp7cNB5.wcIwz./Ct/Uz7Sq59a	2020-04-03	2020-04-03
mayyar@gmail.com	$2b$10$dF5FKXm34TfGo3XFLGC8gORH9SxmmWxP9NEeYnIE7zYNzAS5QR/Gm	2020-04-03	2020-04-03
\.


--
-- Name: ingredients_ingredient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredients_ingredient_id_seq', 1, false);


--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipes_recipe_id_seq', 1008, true);


--
-- Name: favourites favourites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT favourites_pkey PRIMARY KEY (recipe_id, email);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (ingredient_id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (recipe_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);


--
-- Name: favourites email fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT "email fk" FOREIGN KEY (email) REFERENCES public.users(email);


--
-- Name: ingredients ingredients_ingredient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_ingredient_id_fkey FOREIGN KEY (ingredient_id) REFERENCES public.recipes(recipe_id) NOT VALID;


--
-- Name: favourites recipe_id fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favourites
    ADD CONSTRAINT "recipe_id fk" FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id);


--
-- PostgreSQL database dump complete
--

