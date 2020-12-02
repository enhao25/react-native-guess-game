import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = props => {
    // Allows us to pass in custom styles as input and then append them to the view to be more flexible
    return(
        <View style={{...styles.card, ...props.style}}>
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 5,
        padding: 15,
        borderRadius: 10
    },
});

export default Card;