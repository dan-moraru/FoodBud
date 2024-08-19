# FoodBud

## [FoodBud](https://nutritionbud.azurewebsites.net/)

## Authors: 

Dan Moraru, Amir Mojtahedi, Oleksandr Sologub, Samir Abo-Assfour

## Description:

MERN stack app containing large data set of foods. Allows the user to search and calculate total nutrition and daily value, as well as create a user account and create, update and delete custom food. Additionally, allows creating nutrition goals to track progress. App is hosted on Azure.

## Data units
> NOTE: All servings are in **100 grams**
1. Name
2. Calories
3. Fat              (g)
4. Protein          (g)
5. Carbohydrate     (g)
6. Sugars           (g)
7. Fiber            (g)
8. Cholesterol      (mg)
9. Calcium          (mg)
10. Iron, Fe        (mg)
11. Vitamin C       (mg)
12. Vitamin D       (mcg)
13. Vitamin B.12    (mcg)
14. Vitamin A, RAE  (mcg)
15. Sodium          (mg)
16. Potassium       (mg)

## Structure

There are two directories in the __root__ of the project.

* The Express server is in `server/`
* The React app is in `client/`
* The server responds to API calls and serves the __built__ React app.

Server and Client directories have their own modules and package.json

## Setup

> NOTE: Make sure to have .env file in root, server and in client

### .env file will contain: 

- CONNECTION_STRING=
- GOOGLE_CLIENT_ID=
- SECRET=

### variables for Azure deployment

- AZURE_SAS=
- CONTAINER_NAME=
- SACCOUNT_NAME=

### Client .env should only need to contain

- REACT_APP_GOOGLE_CLIENT_ID=

To install all the dependencies and build the app:

```
npm run build
```

Seed database if haven't done already

```
cd server
npm run seed
```

Run Tests

```
npm run test
```

## Run app in development

```
npm run dev
cd client
npm start
```
Click `y` to accept new port for proxy

## Run app in production (after build)

```
npm run start
```

## Attributions

* [Food data](https://tools.myfooddata.com/nutrition-facts-database-spreadsheet.php)

* [Daily Value data](https://www.fda.gov/food/nutrition-facts-label/daily-value-nutrition-and-supplement-facts-labels)

* [Google OAuth2](https://developers.google.com/identity/protocols/oauth2)

* [Icons](https://www.flaticon.com/)
