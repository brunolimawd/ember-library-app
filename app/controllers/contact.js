import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { gte, and, not } from '@ember/object/computed';

export default Controller.extend({

    responseMessage: '',
    emailAddress: '',
    message: '',

    isValid: computed.match('emailAddress', /^.+@.+\..+$/),
    isLongEnough: gte('message.length', 5),
    checkBoth: and('isValid', 'isLongEnough'),
    
    isDisabled: not('checkBoth'),

    actions: {
        sendMessage() {
            const email = this.get('emailAddress');
            const message = this.get('message');

            const newContact = this.store.createRecord('contact', {email: email, message: message});
            newContact.save().then(response => {
                this.set('responseMessage', `We got your message and we’ll get in touch soon with ${response.get('email')}`);
                this.set('emailAddress', '');
                this.set('message', '');
            });

            
        }
    },

});
