exports.viewAction = override => {
    const obj = {
        type: 'view_submission',
        trigger_id: '1752953798610.1725004347028.815dbefcd743a5e4bc879515a0fa6cdd',
        user: {
            id: 'U01M',
            username: 'neltoby',
            name: 'neltoby',
            team_id: 'T01MB0'
        },
        view: {
            id: 'V01N50',
            team_id: 'T01MB0',
            type: 'modal',
            private_metadata: 'C01M5',
            callback_id: '',
            state: { 
                values: {
                    actions_4: { 
                        select_4: { 
                            type: 'plain_text_input', value: '1234' 
                        } 
                    }
                }
             },
            hash: '1613399635.QC',
            title: { type: 'plain_text', text: '3 digits?', emoji: true },
            clear_on_close: true,
            notify_on_close: true,
            close: { type: 'plain_text', text: 'Close', emoji: true },
            submit: { type: 'plain_text', text: 'Submit', emoji: true },
            previous_view_id: null,
            root_view_id: 'V01N',
            app_id: 'A01M',
            external_id: '',
            app_installed_team_id: 'T01M',
            bot_id: 'B01M',
            blocks: [ 
                {
                    "type": "input",
                    "block_id": "actions_4",
                    "label": {
                        "type": "plain_text",
                        "text": "Enter the first 3 digits on the number scale?"
                    },
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "select_4",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Write your answer"
                        }
                    }
                }
            ]
        }
    }
    return {
        ...obj,
        ...override
    }
}