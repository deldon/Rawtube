# RawTube API - "TikTok" and "YouTube" Style


![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

<img src="./doc/img/header.png">

> Une API pour une application Web vidéo de type "TikTok" et "YouTube"

## À propos

Cette API permet de créer une application Web de partage de vidéos similaire à "TikTok" et "YouTube". Elle comprend les fonctionnalités suivantes : création de compte, connexion, authentification, publication de nouvelles vidéos, commentaires et likes.

L'application utilise le logiciel FFmpeg pour le réencodage des vidéos et FFprobe pour obtenir des informations sur les vidéos.

## Installation

Suivez les étapes ci-dessous pour installer et exécuter l'application :

1. Créez une base de données PostgreSQL.

2. Renommez le fichier `x.env` en `.env` et éditez les paramètres de la base de données, le port et générez une clé secrète.

3. Installez le logiciel FFmpeg :

```shell
sudo apt-get install ffmpeg
```

4. Installez le logiciel FFprobe :

```shell
sudo apt-get install ffprobe
```

5. Installez les dépendances nécessaires :

```shell
npm install
```

6. Lancez l'application :

```shell
npm run dev
```

7. Connectez-vous à Swagger pour explorer les différents endpoints de l'API :

```
http://localhost:3000/api-docs/
```

## Contributions

Les contributions à cette API sont les bienvenues ! Si vous souhaitez ajouter des fonctionnalités, résoudre des problèmes ou améliorer le code, n'hésitez pas à créer une demande de pull.

## Licence

Ce projet est sous licence [MIT](LICENSE).

---

Web Video API - 
Créée par deldon - [GitHub Profile](https://github.com/deldon)
Créée par mark - [GitHub Profile](https://github.com/MarkSoclock)
