import { StyleSheet } from "react-native"

const onboardingStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputContainer: {
        width: '80%',
    },

    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
    },

    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    button: {
        backgroundColor: '#c1e8eb',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },

    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: 'blue',
        borderWidth: 2,
    },

    buttonText: {

    },

    redirectToLoginContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },

    redirectButton: {
        marginLeft: 7,
    }, 

    redirectText: {
        
    },

    redirectButtonText: {
        fontWeight: '600',
        color: 'blue',
    },

})

export { onboardingStyle };