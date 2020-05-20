# --- !Ups

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
  "user" INTEGER NOT NULL,
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

INSERT into category values (1,'Laptopy');
INSERT into category values (2,'Monitory');
INSERT into product values (0,'Laptop','Przebrnij przez wielozadaniowy dzień z krótkimi terminami realizacji, korzystając z komputera HP ProBook 450, dostępnego z najnowszym, opcjonalnym, czterordzeniowym procesorem Intel® Core™ 8. generacji opcjonalną osobną kartą graficzną NVIDIA® GeForce® oraz akumulatorem o długim czasie pracy.',3000.99,'https://stat-m1.ms-online.pl/media/cache/gallery/rc/v3zyov58/images/20/20776718/hp-15-da0015nw-1.jpg',1);
INSERT into product values (1,'Monitor','wysmienity monitor',1200.99,'https://images.morele.net/full/1774432_0_f.jpg',2);

INSERT INTO topdeals values (0,0,60);
INSERT INTO topdeals values (1,1,30);

select * from product

