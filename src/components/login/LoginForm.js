import {
  Form,
  useNavigation,
} from "react-router-dom";

import classes from "./LoginForm.module.css";

function LoginForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  return (
    <>
      <Form method="post" className={classes.form}>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
        <p>
          <button>Google</button>
        </p>
      </Form>
    </>
  );
}

export default LoginForm;
