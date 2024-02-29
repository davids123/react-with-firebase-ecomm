const config = {
    apiKey: "AIzaSyCyIvqzE_Wv6HUStkQBuaZ1OcVHKa-9Opk",
    authDomain: "m-com-ad72f.firebaseapp.com",
    projectId: "m-com-ad72f",
    storageBucket: "m-com-ad72f.appspot.com",
    messagingSenderId: "930360203423",
    appId: "1:930360203423:web:2be15d42bded624ea7aaaa"
};

export function getFirebaseConfig(){
    if(!config || !config.apiKey){
        throw new Error('No Firebase configuration object provided.' + '\n' +
        'Add your web app\'s configuration object to firebase-config.ts');

    }else{
        return config;
    }
}