import React from "react";
import { Route } from "react-router-dom";

import CollectionOverview from "./../../components/collection-overview/CollectionOverview";
import Collection from "../collection/Collection";

import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { fetchCollectionStartAsync } from "./../../redux/shop/shop-action";
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded
} from "../../redux/shop/shop-selectors";

//higher order components
import withSpinner from "./../../components/with-spinner/withSpinner";

const CollectionsOverviewWithSpinner = withSpinner(CollectionOverview);
const CollectionWithSpinner = withSpinner(Collection);

class Shop extends React.Component {
  componentDidMount() {
    const { fetchCollectionStartAsync } = this.props;
    fetchCollectionStartAsync();
    // fetch(
    //   `https://firestore.googleapis.com/v1/projects/ecomclothing-db/databases/(default)/documents/collections`
    // )
    //   .then(res => res.json())
    //   .then(collections => {
    //     console.log(collections);
    //     const collectionsMap = convertCollectionsSnapshopToMap(collections);
    //   });
  }

  render() {
    const { match, isCollectionFetching, isCollectionLoaded } = this.props;

    return (
      <div>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionWithSpinner isLoading={!isCollectionLoaded} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  isCollectionLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = dispatch => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
