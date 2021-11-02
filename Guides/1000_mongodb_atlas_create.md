# Guide til oprettelse af MongoDB Atlas løsning

Følgende vil guide dig igennem opsætningen af MongoDb Atlas, som er en NoSQL cloudbaseret database løsning.

Løsningen er bygget på følgende hieraki:
* *Cluster*: samling af databaser (*restaurant, webshop, community...*)
* *Database*: Samling af *collections* eller tabeller (*users, products, movies...*)
* *Collections*: Samling af document eller rows (*Person 1, person 2, person 3...*)
* *Documents*: Samlinger af datafelter (*id, name, birthdate...*)
* *Fields*: Felter til værdier (*2343, Hans, 22-07-1968...*)

**1. Gå til https://account.mongodb.com/account/login?signedOut=true**

![Sign Up](/guides/images/1_signup.png)
___
**2. Udfyld formularen og log ind**

![Udfyld formularen](/guides/images/2_createuser.png)
___
**3. Klik på *Build database***

![Byg database](/guides/images/3_builddatabase.png)
___
**4. Vælg *shared***

![Vælg shared](/guides/images/4_deployshared.png)
___
**5. Indstillinger: Vælg provider**

![Vælg provider](/guides/images/5_chooseprovider.png)
___
**6. Indstillinger: Vælg cluster tier**

![Vælg cluster tier](/guides/images/6_chooseclustertier.png)
___
**7. Indstillinger: Vælg backup**

![Valg af backup](/guides/images/7_additionalsettings.png)
___
**8. Indstillinger: Angiv database navn og klik *Create cluster* nederst på sitet**

![Navngiv cluster](/guides/images/8_clustername.png)
___
**9. Cluster oprettes**

Dit cluster bygges og du skulle gerne se nedenstående skærmbillede (tager et par minutter)
![Cluster bygges](/guides/images/9_buildingcluster.png)
___
**10. Overblik over database deployments**

Her får du et overblik over din database og dennes *collections*.
Klik på *Browse collections*.

![Database deployments](/guides/images/10.database_deployments.png)
___
**11. Load sample data**

Du har nu mulighed for at oprette dine egne data eller hente nogle sample data. Da vi gerne vil teste Mongo DB kan vi starte med at hente sample data. (Det tager et par minutter)

![Load sample data](/guides/images/11_load_sample_data.png)
___
**12. Database / Collection oversigt**

Nu skulle du gerne kunne se en samling database og collections i venstre side af vinduet. Hvis du klikker på pilen ud for en *database* kan du set databasens *collections*.

![Database, collection overview](/guides/images/12_db_collection_overview.png)
___
**13. Dataset**

Et dataset består af en række felter og deres værdier, som er struktureret i et json objekt, som kaldes et *document*. I eksemplet er hver restaurant repræsenteret med sine specifikke data i sit eget *document*. Værdierne er forskellige men strukturen i datasettet er ens for alle restauranter.

![Database, collection overview](/guides/images/13_dataset.png)
___

