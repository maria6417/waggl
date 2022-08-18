import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  SignInWithGoogleButton,
  InputEmail,
  InputPassword,
  SubmitButton,
  InputFirstName,
  InputLastName,
} from '../InputForm';
import { SectionTitle, Container_1_2, Button } from '../../../styledComponents';
import {
  Cols,
  CenterText,
  LinkButton,
  ContainerHalf,
  ContainerHalfForImage,
} from '../StyledFormComponents';
import NavBar from '../../NavBar/NavBar';
import { createUser } from '../Parse';
import useUserStore from '../../../UserStore';

export default function SignUp() {
  const setUserId = useUserStore((state) => state.setUserId);
  const userId = useUserStore((state) => state.userId);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const firstnameChangeHandler = (e) => {
    setFirstName(e.target.value);
  };
  const lastnameChangeHandler = (e) => {
    setLastName(e.target.value);
  };
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const signupClickHandler = () => {
    if (password.length > 13) {
      alert("Your password can't be longer than 13 character");
    } else {
      if (validateEmail(email)) {
        createUser(firstName, lastName, password, email)
          .then((response) => {
            console.log(response.data);
            setUserId(response.data[0].user_id);
            console.log(userId);
          })
          .catch((error) => {
            console.log('unable to create user ', error);
          });
      } else {
        alert('invaild email');
      }
    }
  };
  return (
    <div>
      <NavBar type="welcome" />
      <Cols>
        <ContainerHalfForImage>
          <img
            sizes="(max-width: 767px) 100vw, 100vw"
            src="https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZG9nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1100&q=60"
            alt="yellow Labrador retriever biting yellow tulip flower"
          />
        </ContainerHalfForImage>
        <ContainerHalf>
          <SectionTitle>Sign Up</SectionTitle>
          <SignInWithGoogleButton value="Sign up with Google" />
          <CenterText>------------ or ------------</CenterText>
          <form>
            <InputFirstName firstnameChangeHandler={firstnameChangeHandler} />
            <InputLastName lastnameChangeHandler={lastnameChangeHandler} />
            <InputEmail emailChangeHandler={emailChangeHandler} />
            <InputPassword passwordChangeHandler={passwordChangeHandler} />
            <SubmitButton
              value="Sign Up"
              buttonClickHandler={signupClickHandler}
            />
          </form>
          <span>Already have an account</span>
          {'   '}
          <Link to="/LogIn">
            <LinkButton type="button">Login</LinkButton>
          </Link>
          <br />
          <Link to="/">
            <Button>This is a Link to App "Page"!</Button>
          </Link>
        </ContainerHalf>
      </Cols>
    </div>
  );
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
