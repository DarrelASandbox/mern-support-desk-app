## Notes

1. Creating frontend folder from root directory.

```sh
npx create-react-app frontend --template redux
```

2. Delete .git folder in frontend folder.

```sh
cd frontend
rm -rf .git
ls -a
cd ..
```

&nbsp;

### Notes from Route Guard comment section:

> <b>Q:</b> In the firebase project in the useAuthState hook we had to create an isMounted variable with useRef to avoid potential memory leak due to async nature of checking the user auth state. Why did we not need to do it here? Id it because in the firebase project we had to use getAuth() to check for a user, where here we are using Redux?

> <b>Will:</b> In the Firebase app the onAuthStateChanged function sets up an observer or listener using Web Sockets that runs every time Firebase auth changes, so log in, log out, sign up etc. If our component using the hook then is removed from the DOM, like on another page for example the listener would still be running and potentially try to update state in a component that is no longer mounted, which would be a memory leak. However using an isMounted ref is quite a generic solution, it will prevent the attempted state update but it won't stop the listener running in the background, so we still have memory leaks.

> Fortunately onAuthStateChanged actually returns a Unsubscribe function that you can use as a cleanup from useEffect, so you don't actually need a ref here...

```js
export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    // FIX: use the unsubscribe returned from onAuthStateChanged for cleanup
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setCheckingStatus(false);
    });

    return unsubscribe;
  }, []);

  return { loggedIn, checkingStatus };
};
```

> Whereas in the Support Ticket app there is no such listener, the hook only responds to state changed which being a redux app the Provider will never be unmounted. In fact the useAuthStatus hook in the Support Ticket app is just a duplicate of Redux state so isn't really necessary, you already have the exact same state in Redux which is obviously available to every component anyway.

> To be honest though in both cases I personally don't see the point of a custom hook here as in each app it's only used in one place (PrivateRoute in both apps). Normally you would write a custom hook to be able to re use some logic in many components. In the case of the Firebase app I think something like a useUser or useAuth hook would be a better example for a custom hook as we currently have repeated logic using getAuth() in many different components. The hook could subscribe to Firebase Auth and provide all the logged in users details if they are logged in or some falsey value if not. It would save a lot of repetition we currently have so would be a perfect use case for a custom hook.
