import React, { FC, useRef } from "react";
// formspree
import { useForm, ValidationError } from "@formspree/react";

const FooterSubscribe: FC = () => {
  const [state, handleSubmit] = useForm("xpzbpzgo");
  const emailInput: React.RefObject<HTMLInputElement> = useRef(null);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleSubmit(e);
    emailInput.current!.value = "";
  };

  return (
    <div className="footer-subscribe">
      <h5>Subscribe to news</h5>
      {state.succeeded && (
        <p className="validation-success">Thanks for joining!</p>
      )}
      <ValidationError
        className="validation-error"
        prefix="Email"
        field="email"
        errors={state.errors}
      />
      <form
        className="footer-subscribe-form"
        onSubmit={(e) => handleEmailSubmit(e)}
      >
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email Adress"
          required
          ref={emailInput}
        />
        <button type="submit" disabled={state.submitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FooterSubscribe;
