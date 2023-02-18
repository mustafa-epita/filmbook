
CREATE TABLE "Roles" (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name character varying NOT NULL
);

CREATE TABLE movies (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title character varying(255) NOT NULL,
    added date NOT NULL,
    external_id character varying(255) NOT NULL
);

CREATE TABLE "Users" (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username character varying(255) NOT NULL,
    role_id integer NOT NULL REFERENCES "Roles"(id),
    password character varying(255) NOT NULL
);

CREATE TABLE "Contacts" (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer NOT NULL REFERENCES "Users"(id),
    name character varying(255),
    birth_date date,
    gender character varying(255),
    email character varying(255)
);

CREATE TABLE "Addresses" (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    country character varying,
    area character varying,
    city character varying,
    street character varying,
    number character varying,
    contact_id integer NOT NULL REFERENCES "Contacts"(id)
);

CREATE TABLE "SeenMovies" (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id integer NOT NULL REFERENCES "Users"(id),
    movie_id integer NOT NULL REFERENCES movies(id)
);

INSERT INTO "public"."Roles"("name")
VALUES
(E'user'),
(E'admin');

INSERT INTO "public"."Users"("username","role_id","password")
VALUES
(E'johndoe',1,E'123123'),
(E'janedoe',1,E'123123'),
(E'jimsmith',1,E'123123'),
(E'sarahjohnson',1,E'123123'),
(E'mikelee',1,E'123123'),
(E'samuelparker',2,E'123123'),
(E'emmawatson',2,E'123123'),
(E'peterjackson',1,E'123123'),
(E'ashleydavis',1,E'123123'),
(E'jenniferbrown',1,E'123123'),
(E'joe mama',1,E'567567');

INSERT INTO "public"."movies"("title","added","external_id")
VALUES
(E'Avatar: The Way of Water',E'2023-02-10',E'63e7f002c0e5e873e4eacfa1'),
(E'Glass Onion: A Knives Out Mystery',E'2023-02-10',E'63e7f002c0e5e873e4eacfa2'),
(E'Top Gun: Maverick',E'2023-02-10',E'63e7f002c0e5e873e4eacfa3'),
(E'Violent Night',E'2023-02-10',E'63e7f002c0e5e873e4eacfa4'),
(E'Puss in Boots: The Last Wish',E'2023-02-10',E'63e7f002c0e5e873e4eacfa5'),
(E'Black Adam',E'2023-02-10',E'63e7f002c0e5e873e4eacfa6'),
(E'Troll',E'2023-02-10',E'63e7f002c0e5e873e4eacfa7'),
(E'Savage Salvation',E'2023-02-10',E'63e7f002c0e5e873e4eacfa8'),
(E'High Heat',E'2023-02-10',E'63e7f002c0e5e873e4eacfa9'),
(E'Avatar',E'2023-02-10',E'63e7f002c0e5e873e4eacfaa'),
(E'The Big 4',E'2023-02-10',E'63e7f002c0e5e873e4eacfab'),
(E'The Chronicles of Narnia: The Lion, the Witch and the Wardrobe',E'2023-02-10',E'63e7f002c0e5e873e4eacfac'),
(E'The Woman King',E'2023-02-10',E'63e7f002c0e5e873e4eacfad'),
(E'Prey for the Devil',E'2023-02-10',E'63e7f002c0e5e873e4eacfae'),
(E'Roald Dahls Matilda the Musical',E'2023-02-10',E'63e7f002c0e5e873e4eacfaf'),
(E'My Name Is Vendetta',E'2023-02-10',E'63e7f002c0e5e873e4eacfb0'),
(E'Strange World',E'2023-02-10',E'63e7f002c0e5e873e4eacfb1'),
(E'Black Panther: Wakanda Forever',E'2023-02-10',E'63e7f002c0e5e873e4eacfb2'),
(E'Guillermo del Toros Pinocchio',E'2023-02-10',E'63e7f002c0e5e873e4eacfb3'),
(E'A Frozen Rooster',E'2023-02-10',E'63e7f002c0e5e873e4eacfb4'),
(E'Detective Knight: Rogue',E'2023-02-10',E'63e7f002c0e5e873e4eacfb5'),
(E'R.I.P.D. 2: Rise of the Damned',E'2023-02-10',E'63e7f002c0e5e873e4eacfb6'),
(E'M3GAN',E'2023-02-10',E'63e7f002c0e5e873e4eacfb7'),
(E'Hex',E'2023-02-10',E'63e7f002c0e5e873e4eacfb8'),
(E'One Way',E'2023-02-10',E'63e7f002c0e5e873e4eacfb9'),
(E'Fall',E'2023-02-10',E'63e7f002c0e5e873e4eacfba'),
(E'The Boss Baby: Christmas Bonus',E'2023-02-10',E'63e7f002c0e5e873e4eacfbb'),
(E'Disenchanted',E'2023-02-10',E'63e7f002c0e5e873e4eacfbc'),
(E'Terrifier 2',E'2023-02-10',E'63e7f002c0e5e873e4eacfbd'),
(E'Monstrous',E'2023-02-10',E'63e7f002c0e5e873e4eacfbe'),
(E'Smile',E'2023-02-10',E'63e7f002c0e5e873e4eacfbf'),
(E'Sniper: The White Raven',E'2023-02-10',E'63e7f002c0e5e873e4eacfc0'),
(E'Night at the Museum: Kahmunrah Rises Again',E'2023-02-10',E'63e7f002c0e5e873e4eacfc1'),
(E'The Minute You Wake Up Dead',E'2023-02-10',E'63e7f002c0e5e873e4eacfc2'),
(E'Blowback',E'2023-02-10',E'63e7f002c0e5e873e4eacfc3'),
(E'Abandoned',E'2023-02-10',E'63e7f002c0e5e873e4eacfc4'),
(E'Alien Sniperess',E'2023-02-10',E'63e7f002c0e5e873e4eacfc5'),
(E'Emancipation',E'2023-02-10',E'63e7f002c0e5e873e4eacfc6'),
(E'Pinocchio',E'2023-02-10',E'63e7f002c0e5e873e4eacfc7'),
(E'Dangerous Game: The Legacy Murders',E'2023-02-10',E'63e7f002c0e5e873e4eacfc8'),
(E'Lyle, Lyle, Crocodile',E'2023-02-10',E'63e7f002c0e5e873e4eacfc9'),
(E'Jeepers Creepers: Reborn',E'2023-02-10',E'63e7f002c0e5e873e4eacfca'),
(E'Spider-Man: No Way Home',E'2023-02-10',E'63e7f002c0e5e873e4eacfcb'),
(E'All Quiet on the Western Front',E'2023-02-10',E'63e7f002c0e5e873e4eacfcc'),
(E'Jurassic World Dominion',E'2023-02-10',E'63e7f002c0e5e873e4eacfcd'),
(E'Thor: Love and Thunder',E'2023-02-10',E'63e7f002c0e5e873e4eacfce'),
(E'Paradise City',E'2023-02-10',E'63e7f002c0e5e873e4eacfcf'),
(E'Blade of the 47 Ronin',E'2023-02-10',E'63e7f002c0e5e873e4eacfd0'),
(E'Dragon Ball Super: Super Hero',E'2023-02-10',E'63e7f002c0e5e873e4eacfd1'),
(E'Lost Bullet 2',E'2023-02-10',E'63e7f002c0e5e873e4eacfd2'),
(E'The Guardians of the Galaxy Holiday Special',E'2023-02-10',E'63e7f002c0e5e873e4eacfd3'),
(E'The Menu',E'2023-02-10',E'63e7f002c0e5e873e4eacfd4'),
(E'Bullet Train',E'2023-02-10',E'63e7f002c0e5e873e4eacfd5'),
(E'Emily the Criminal',E'2023-02-10',E'63e7f002c0e5e873e4eacfd6'),
(E'Maneater',E'2023-02-10',E'63e7f002c0e5e873e4eacfd7'),
(E'Prey',E'2023-02-10',E'63e7f002c0e5e873e4eacfd8'),
(E'Puss in Boots',E'2023-02-10',E'63e7f002c0e5e873e4eacfd9'),
(E'Diary of a Wimpy Kid: Rodrick Rules',E'2023-02-10',E'63e7f002c0e5e873e4eacfda'),
(E'Orphan: First Kill',E'2023-02-10',E'63e7f002c0e5e873e4eacfdb'),
(E'The Lair',E'2023-02-10',E'63e7f002c0e5e873e4eacfdc'),
(E'Luck',E'2023-02-10',E'63e7f002c0e5e873e4eacfdd'),
(E'Scrooge: A Christmas Carol',E'2023-02-10',E'63e7f002c0e5e873e4eacfde'),
(E'Sonic the Hedgehog 2',E'2023-02-10',E'63e7f002c0e5e873e4eacfdf'),
(E'Beast',E'2023-02-10',E'63e7f002c0e5e873e4eacfe0'),
(E'On the Line',E'2023-02-10',E'63e7f002c0e5e873e4eacfe1'),
(E'MexZombies',E'2023-02-10',E'63e7f002c0e5e873e4eacfe2'),
(E'Tom and Jerry Snowmans Land',E'2023-02-10',E'63e7f002c0e5e873e4eacfe3'),
(E'Encanto',E'2023-02-10',E'63e7f002c0e5e873e4eacfe4'),
(E'Blues Big City Adventure',E'2023-02-10',E'63e7f002c0e5e873e4eacfe5'),
(E'Mal de Ojo',E'2023-02-10',E'63e7f002c0e5e873e4eacfe6'),
(E'Enola Holmes 2',E'2023-02-10',E'63e7f002c0e5e873e4eacfe7'),
(E'Fullmetal Alchemist: The Final Alchemy',E'2023-02-10',E'63e7f002c0e5e873e4eacfe8'),
(E'Bromates',E'2023-02-10',E'63e7f002c0e5e873e4eacfe9'),
(E'The Darker the Lake',E'2023-02-10',E'63e7f002c0e5e873e4eacfea'),
(E'Tad, the Lost Explorer and the Emerald Tablet',E'2023-02-10',E'63e7f002c0e5e873e4eacfeb'),
(E'Slumberland',E'2023-02-10',E'63e7f002c0e5e873e4eacfec'),
(E'Hellraiser',E'2023-02-10',E'63e7f002c0e5e873e4eacfed'),
(E'The Hip Hop Nutcracker',E'2023-02-10',E'63e7f002c0e5e873e4eacfee'),
(E'Minions: The Rise of Gru',E'2023-02-10',E'63e7f002c0e5e873e4eacfef'),
(E'The Batman',E'2023-02-10',E'63e7f002c0e5e873e4eacff0'),
(E'Athena',E'2023-02-10',E'63e7f002c0e5e873e4eacff1'),
(E'Doctor Strange in the Multiverse of Madness',E'2023-02-10',E'63e7f002c0e5e873e4eacff2'),
(E'Jujutsu Kaisen 0',E'2023-02-10',E'63e7f002c0e5e873e4eacff3'),
(E'The InfernMachine',E'2023-02-10',E'63e7f002c0e5e873e4eacff4'),
(E'The Soccer Football Movie',E'2023-02-10',E'63e7f002c0e5e873e4eacff5'),
(E'Secret Headquarters',E'2023-02-10',E'63e7f002c0e5e873e4eacff6'),
(E'Demon Slayer -Kimetsu no Yaiba- The Movie: Mugen Train',E'2023-02-10',E'63e7f002c0e5e873e4eacff7');

INSERT INTO "public"."SeenMovies"("user_id","movie_id")
VALUES
(1, 14), 
(1, 81), 
(1, 29), 
(1, 49), 
(1, 37), 
(1, 83), 
(1, 41), 
(1, 62), 
(1, 2), 
(1, 11), 
(1, 22), 
(1, 31), 
(1, 54), 
(1, 34), 
(1, 21), 
(1, 50), 
(1, 40), 
(1, 42), 
(1, 84), 
(1, 80), 
(1, 75), 
(1, 82), 
(1, 36), 
(1, 9),
(2, 18), 
(2, 13), 
(2, 67), 
(2, 4), 
(2, 30), 
(2, 44), 
(2, 24), 
(2, 75), 
(2, 21), 
(2, 78), 
(2, 80), 
(2, 71),
(3, 30), 
(3, 78), 
(3, 33), 
(3, 46), 
(3, 24), 
(3, 68), 
(3, 77), 
(3, 27), 
(3, 74), 
(3, 69), 
(3, 71), 
(3, 80), 
(3, 35), 
(3, 42), 
(3, 79), 
(3, 16), 
(3, 65), 
(3, 43), 
(3, 82), 
(3, 21), 
(3, 17), 
(3, 54), 
(3, 3), 
(3, 84),
(4, 14), 
(4, 62), 
(4, 23), 
(4, 24), 
(4, 57), 
(4, 68), 
(4, 10), 
(4, 25), 
(4, 13), 
(4, 51), 
(4, 27), 
(4, 19), 
(4, 64), 
(4, 45), 
(4, 74), 
(4, 72), 
(4, 22), 
(4, 65), 
(4, 38), 
(4, 15), 
(4, 73), 
(4, 11), 
(4, 20), 
(4, 1), 
(4, 2), 
(5, 45), 
(5, 7), 
(5, 40), 
(5, 79), 
(5, 26), 
(5, 11), 
(5, 55), 
(5, 61), 
(5, 18), 
(5, 20), 
(5, 85), 
(5, 47), 
(5, 65), 
(5, 68), 
(5, 78), 
(5, 33), 
(5, 17), 
(5, 64), 
(5, 37), 
(5, 63), 
(5, 57), 
(5, 62), 
(5, 8), 
(5, 34), 
(5, 60),
(6, 43), 
(6, 80), 
(6, 19), 
(6, 61), 
(6, 57), 
(6, 8), 
(6, 18), 
(6, 56), 
(6, 11), 
(6, 45), 
(6, 49), 
(6, 17), 
(6, 63), 
(6, 23), 
(6, 29), 
(6, 84), 
(6, 58),
(7, 45), 
(7, 29), 
(7, 81), 
(7, 32), 
(7, 68), 
(7, 20), 
(7, 43), 
(7, 73), 
(7, 65), 
(7, 83), 
(7, 26), 
(7, 82), 
(7, 4), 
(7, 12), 
(7, 39), 
(7, 2), 
(7, 74), 
(7, 79), 
(7, 49), 
(7, 24), 
(7, 34), 
(7, 18), 
(7, 37), 
(7, 57), 
(7, 8), 
(7, 28), 
(7, 30),
(8, 86), 
(8, 82), 
(8, 68), 
(8, 81), 
(8, 66), 
(8, 43), 
(8, 37), 
(8, 41), 
(8, 49), 
(8, 51), 
(8, 30), 
(8, 5), 
(8, 78), 
(8, 61), 
(8, 54), 
(8, 12), 
(8, 19), 
(8, 60), 
(8, 1), 
(8, 48), 
(8, 52), 
(8, 46), 
(8, 74), 
(8, 53),
(9, 62), 
(9, 59), 
(9, 54), 
(9, 86), 
(9, 76), 
(9, 37), 
(9, 87), 
(9, 7), 
(9, 22), 
(9, 13), 
(9, 69), 
(9, 36), 
(9, 19), 
(9, 56), 
(9, 70), 
(9, 52), 
(9, 65), 
(9, 16), 
(9, 20), 
(9, 4), 
(9, 43), 
(9, 46),
(10, 46), 
(10, 3), 
(10, 67), 
(10, 69), 
(10, 37), 
(10, 81), 
(10, 22), 
(10, 57), 
(10, 16), 
(10, 25), 
(10, 15), 
(10, 51), 
(10, 5), 
(10, 86), 
(10, 6), 
(10, 31), 
(10, 62), 
(10, 77), 
(10, 18);