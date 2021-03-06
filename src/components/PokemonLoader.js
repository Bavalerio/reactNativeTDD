import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from "react-native";
import { connect } from "react-redux";

import Card from "./Card";

import pokeball from "../img/pokeball.jpg";

class PokemonLoader extends Component {
  render() {
    const { fetching, pokemon, requestPokemon, error, requestError } = this.props;

    return (
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={requestPokemon} testID="action_button">
          <View style={styles.content}>
            {pokemon && <Card data={pokemon} fetching={fetching} />}

            {!pokemon &&
              !fetching && (
                <Image
                  source={pokeball}
                  resizeMode={"contain"}
                  style={styles.pokeBall}
                  testID="pokeball_image"
                />
              )}

            {fetching && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  testID="loader"
                />
              </View>
            )}

            {error && (
              <Text style={styles.errorText} testID="error_message">
                Something went wrong while trying to fetch a new Pokemon.
                {error}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <Button title="Mostar un error" onPress={requestError} testID="mostrar_error" />
      </View>
    );
  }
}

const styles = {
  textContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  pokeBall: {
    width: 120,
    height: 120,
    marginTop: 50
  },
  errorText: {
    color: "red"
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center"
  }
};

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    pokemon: state.pokemon,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestPokemon: () => dispatch({ type: "API_CALL_REQUEST" }),
    requestError: () => dispatch({ type: "API_CALL_FAILURE", error: 'Algo salio mal' })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonLoader);
