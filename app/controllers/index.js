import { computed, observer } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({

    responseMessage: '',
    emailAddress: '',
    headerMessage: 'Comming Soon',

    isValid: computed.match('emailAddress', /^.+@.+\..+$/),
    isDisabled: computed.not('isValid'),

    actions: {
        saveInvitation() {
            console.log(`Saving of the following email address is in progress: ${this.get('emailAddress')}`);
            this.set('responseMessage', `Thank you! We've just saved your email address: ${this.get('emailAddress')}`);
            this.set('emailAddress', '');
        }
    },

    actualEmailAddress: computed('emailAddress', function() {
        console.log('actualEmailAddress function is called: ', this.get('emailAddress'));
    }),
    
    emailAddressChanged: observer('emailAddress', function() {
        console.log('observer is called', this.get('emailAddress'));
    })

});
