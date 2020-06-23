# --- !Ups
CREATE TABLE "AppUser" (
	"Id"	TEXT NOT NULL UNIQUE,
	"Email"	TEXT NOT NULL,
	"FirstName"	TEXT,
	"LastName"	TEXT,
    "Role"	TEXT NOT NULL,
	PRIMARY KEY("Id")
);

CREATE TABLE "LoginInfo" (
	"Id"	TEXT NOT NULL UNIQUE,
	"ProviderId"	TEXT NOT NULL,
	"ProviderKey"	TEXT NOT NULL
);

CREATE TABLE "UserLoginInfo" (
	"UserId"	TEXT NOT NULL,
	"LoginInfoId"	TEXT NOT NULL,
	FOREIGN KEY("UserId") REFERENCES "AppUser"("Id"),
	FOREIGN KEY("LoginInfoId") REFERENCES "LoginInfo"("Id")
);


CREATE TABLE "PasswordInfo" (
	"Hasher"	TEXT NOT NULL,
	"Password"	TEXT NOT NULL,
	"Salt"	TEXT,
	"LoginInfoId"	TEXT NOT NULL,
	FOREIGN KEY("LoginInfoId") REFERENCES "LoginInfo"("Id")
);

CREATE TABLE "OAuth2Info" (
	"Id"	TEXT NOT NULL UNIQUE,
	"AccessToken"	TEXT NOT NULL,
	"TokenType"	TEXT,
	"ExpiresIn"	INTEGER,
	"RefreshToken"	TEXT,
	"LoginInfoId"	TEXT NOT NULL,
	PRIMARY KEY("Id"),
	FOREIGN KEY("LoginInfoId") REFERENCES "LoginInfo"("Id")
);

CREATE TABLE "user" (
  "id"   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" VARCHAR NOT NULL,
  "mail" VARCHAR NOT NULL,
  "password" VARCHAR NOT NULL
);

CREATE TABLE "category" (
  "id"   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name" VARCHAR NOT NULL
);



CREATE TABLE "product" (
  "id"          INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "name"        VARCHAR NOT NULL,
  "description" TEXT    NOT NULL,
  "price"       FLOAT   NUL NULL,
  "image" TEXT    NOT NULL,
  "category"    INT     NOT NULL,
  FOREIGN KEY (category) references category (id)
);

CREATE TABLE "quantity" (
  "product" INTEGER NOT NULL,
  "amount"  INTEGER NOT NULL,
  FOREIGN KEY (product) references product (id)

);
CREATE TABLE "opinion" (
  "id"   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "review" VARCHAR NOT NULL,
  "stars" INTEGER NOT NULL CHECK ("stars">=1 AND "stars" <=5),
  "userName" VARCHAR NOT NULL ,
  "product" INTEGER NOT NULL,
    FOREIGN KEY (product) references product (id)
);
CREATE TABLE "favourites" (
  "user" VARCHAR NOT NULL,
  "product" INTEGER NOT NULL,
  FOREIGN KEY (user) references user (id),
  FOREIGN KEY (product) references product (id)

);

CREATE TABLE "topdeals" (
  "id"   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "product" INTEGER NOT NULL,
  "discount" INTEGER NOT NULL,
    FOREIGN KEY (product) references product (id)
);
# --- !Downs

DROP TABLE "category";
DROP TABLE "product";
DROP TABLE "opinion";
DROP TABLE "quantity";
DROP TABLE "topdeals";
DROP table favourites

INSERT into category values (1,'Laptopy');
INSERT into category values (2,'Monitory');
INSERT into category values (3,'Myszki');
INSERT into category values (4,'Klawiatury');
INSERT into category values (5,'Akcesoria');
INSERT into product values (0,'Laptop HP PROBook450','Przebrnij przez wielozadaniowy dzień z krótkimi terminami realizacji, korzystając z komputera HP ProBook 450, dostępnego z najnowszym, opcjonalnym, czterordzeniowym procesorem Intel® Core™ 8. generacji opcjonalną osobną kartą graficzną NVIDIA® GeForce® oraz akumulatorem o długim czasie pracy.',3000.99,'https://stat-m1.ms-online.pl/media/cache/gallery/rc/v3zyov58/images/20/20776718/hp-15-da0015nw-1.jpg',1);
INSERT into product values (1,'ASUS TUF VG279QM','Poznaj wyjątkowe funkcje monitora ASUS TUF VG279QM i dołącz do rozgrywki. Urządzenie zostało zaprojektowane z myślą o graczach, więc szybko stanie się Twoim oknem na wirtualne światy. Obsługując technologię HDR, monitor oferuje szerszy zakres jasności i kontrastu, czyniąc gry jeszcze bardziej klimatycznymi. TUF VG279QM dostarczy Ci płynnego obrazu w jakości Full HD, a technologie ochrony wzroku zmniejszą zmęczenie oczu do minimum.',1699.99,'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/1/pr_2020_1_21_12_1_49_145_00.jpg',2);
INSERT into product values (2,'LG 27GL850-B NanoIPS HDR10','Zachwycający design oraz niezwykle bogata funkcjonalność – to czyni z monitora LG 27GL850-B narzędzie, dzięki któremu odkryjesz gaming na nowo. Solidna konstrukcja połączona z panelem IPS WQHD oferuje najlepsze doznania z gry w każdym calu. Bogate kolory, najdrobniejsze szczegóły i niezwykle szybki czas reakcji to cechy, dzięki którym odniesiesz sukces na wirtualnych polach bitwy. Poznaj gamingowy monitor LG 27GL850-B.',2149.99,'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2019/10/pr_2019_10_1_14_27_40_152_00.jpg',2);
INSERT into product values (3,'Redragon LAVAWOLF', 'Redragon LAVAWOLF zaskoczy Cię nie tylko innowacyjnym wyglądem, ale również możliwościami i wyposażeniem. Przyłóż dłoń i poczuj moc, która drzemie w tym niepozornym gryzoniu. Ciesz się doskonałą precyzją i perfekcyjnym odwzorowaniem ruchów dzięki sensorowi optycznemu o maksymalnej rozdzielczości 6400 DPI. Graj intensywnie i nie martw się o wytrzymałość, LAVAWOLF została wyposażona w odporne przełączniki OMRON dla dwóch głównych przycisków. Całość dopełnia możliwość personalizacji - 7 programowalnych przycisków, 3 profile do wyboru i możliwość zmiany koloru podświetlenia. Czego chcieć więcej.',71.99,'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/4/pr_2020_4_20_12_21_58_135_00.jpg',3);
INSERT into product values (4,'Razer Huntsman Tournament Ed. Linear Optical Switch','O zwycięstwie może zadecydować ułamek sekundy. Dlatego właśnie szybkość ma kluczowe znaczenie w klawiaturze Razer Huntsman Tournament Edition. Oprócz liniowych przełączników optycznych Razer™ z optyczną aktywacją 1,0 mm wyróżnia się ona także wbudowaną pamięcią i kompaktowym formatem. Dzięki temu możesz wykonywać zwycięskie ruchy na dowolnej arenie.',599.99,'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2019/10/pr_2019_10_4_12_19_32_414_03.jpg',4);
INSERT into product values (5,'SteelSeries QcK','QcK+ posiada antypoślizgową, gumową podstawę, która zapobiega przemieszczaniu się podkładki podczas użycia. Gumowa podstawa zapewnia także przez cały czas dodatkowy komfort dla Twojej dłoni i nadgarstka. Seria SteelSeries QcK przeszła intensywne testy przeprowadzone przez profesjonalnych graczy, potwierdzające, że seria QcK zapewnia użytkownikom niezawodne podkładki dla optymalnego funkcjonowania.',43.99,'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,pr_2015_9_30_10_8_8_285.png',5);

INSERT INTO topdeals values (0,0,60);
INSERT INTO topdeals values (1,1,30);
INSERT INTO topdeals values (2,4,20);

select * from product

