import React from "react"
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";


const firebase_config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

const email_login = {
  email: process.env.REACT_EMAIL,
  password: process.env.REACT_PASSWORD
}


const TestAuth = () => {
  return (
    <FirebaseAuthProvider {...firebase_config} firebase={firebase}>
      <div>

        {/* Google Sign in */}
        <button
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
            firebase.auth().signInWithPopup(googleAuthProvider)
          }}
        >
          Sign In with Google
        </button>

        {/* anonymously */}
        <button
          data-testid="signin-anon"
          onClick={() => {
            firebase.auth().signInAnonymously()
          }}
        >
          Sign In Anonymously
        </button>

        <br />
        <br />

        {/* E-Mail Sign up */}
        <button
          onClick={async () =>  {
            const res = await firebase.auth().createUserWithEmailAndPassword(email_login.email, email_login.password)
            res.user.sendEmailVerification()
            console.log(res)
          }}
        >
          Sign In with Mail
        </button>

        {/* E-Mail Sign in */}
        <button
          onClick={() => {firebase.auth().signInWithEmailAndPassword(email_login.email, email_login.password)}}
          >
          Log In with Mail
        </button>

        <br />
        <br />

        {/* Sign out */}
        <button
          onClick={() => {
            firebase.auth().signOut()
          }}
        >
          Sign Out
        </button>

        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return (
              <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            )
          }}
        </FirebaseAuthConsumer>

        <div>

          <IfFirebaseAuthed>
            {
            
              () => {
                // To confirm verified Email
                const user = firebase.auth().currentUser
                if(user.emailVerified){
                  return <div>You are authenticated</div>
                }else{
                  return (
                    <div>
                      <div style={{ color: "#ff0000" }}>
                        You have to verify email
                      </div>
                      <button onClick={() => {
                        user.sendEmailVerification()
                      }}>
                        Please Send Email Again
                      </button>
                    </div>
                  )
                }
              }
            
            }
          </IfFirebaseAuthed>

          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== "anonymous"}
          >
            {({ providerId }) => {
              return <div>You are authenticated with {providerId}</div>
            }}
          </IfFirebaseAuthedAnd>

        </div>
        
      </div>
    </FirebaseAuthProvider>

  )
}
export default TestAuth
