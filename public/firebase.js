function login() {
    // Log the user in via Twitter
    var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).catch(function(error) {
      console.log("Error authenticating user:", error);
    });
  }

firebase.auth().onAuthStateChanged(function(user) {
// Once authenticated, instantiate Firechat with the logged in user
if (user) {
    //initChat(user);
    console.log(user.uid);
}
});