# boilerplate
A boilerplate (template) for Progressive Web Apps built with ReactJS + Firebase + Material-UI.

### Setup on Dev machine

NB: This tutorial was tested on Ubuntu Server 20.04 LTS.

Open your terminal and follow the instructions below.

1. Install NVM. Instructions can be found [here](https://github.com/nvm-sh/nvm#installing-and-updating). e.g.

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

2. Install NodeJS & NPM.

```sh
nvm install node
```

3. Setup Firebase CLI (firebase-tools) i.e. install then log in. Instructions can be found [here](https://firebase.google.com/docs/cli). e.g.

  - To install, run

  ```sh
  npm install -g firebase-tools
  ```

  - To log in, run

  ```sh
  firebase login --no-localhost
  ```

4. Clone this repository.

```sh
git clone git@github.com:msisimko/boilerplate.git
```

5. Install dependeny packages.

```sh
npm install
```

6. Initialize Firebase project.

```sh
firebase init
```

  - Select the following products: Firestore & Hosting.
  - Select the default project you want Firebase to use.
  - During Hosting setup, set the following:
    - `What do you want to use as your public directory? (public) build`.
    - `Configure as a single-page app (rewrite all urls to /index.html)? yes`.

7. Create a .env file. Copy & paste the settings below into the file. 

```
# Create React App development settings
# For more: https://create-react-app.dev/docs/advanced-configuration/
BROWSER=none

# firebaseConfig details
# NOTE: Remember to replace `xxxxxXXXXXxxxxx` with your actual Firebase config details, available in the Firebase project settings.
REACT_APP_API_KEY=xxxxxXXXXXxxxxx
REACT_APP_AUTH_DOMAIN=xxxxxXXXXXxxxxx
REACT_APP_DATABASE_URL=xxxxxXXXXXxxxxx
REACT_APP_PROJECT_ID=xxxxxXXXXXxxxxx
REACT_APP_STORAGE_BUCKET=xxxxxXXXXXxxxxx
REACT_APP_MESSAGING_SENDER_ID=xxxxxXXXXXxxxxx
REACT_APP_APP_ID=xxxxxXXXXXxxxxx

```

8. Happy coding!