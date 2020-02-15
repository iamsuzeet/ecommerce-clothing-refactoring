import React from "react";
import { connect } from "react-redux";

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from "./header.styles";

import { auth } from "./../../firebase/firebase.utils";

import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/user/user-selectors";
import { selectCurrentUser } from "./../../redux/user/user-selectors";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "./../cart-icon/CartIcon";
import CartDropdown from "./../cart-dropdown/CartDropdown";

const Header = ({ currentUser, hidden }) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo />
      </LogoContainer>

      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>

        <OptionLink to="/contact">CONTACT</OptionLink>

        {currentUser ? (
          <OptionLink as="div" onClick={() => auth.signOut()}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/connect">SIGN IN</OptionLink>
        )}

        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
