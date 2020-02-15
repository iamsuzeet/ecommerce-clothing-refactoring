import React from "react";
import { Route } from "react-router-dom";

import CollectionOverview from "./../../components/collection-overview/CollectionOverview";
import Collection from "../collection/Collection";
import {
  firestore,
  convertCollectionsSnapshopToMap
} from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { updateCollections } from "./../../redux/shop/shop-action";

//higher order components
import withSpinner from "./../../components/with-spinner/withSpinner";

const CollectionsOverviewWithSpinner = withSpinner(CollectionOverview);
const CollectionWithSpinner = withSpinner(Collection);

class Shop extends React.Component {
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    // fetch(
    //   `https://firestore.googleapis.com/v1/projects/ecomclothing-db/databases/(default)/documents/collections`
    // )
    //   .then(res => res.json())
    //   .then(collections => {
    //     console.log(collections);

    //     const collectionsMap = convertCollectionsSnapshopToMap(collections);
    //   });

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshopToMap(snapshot);

      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(Shop);
