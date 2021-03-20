exports.eventaction = (override) => {
    const obj = {
        actions: [
            {
              type: 'static_select',
              action_id: 'select_1',
              block_id: 'actions_1',
              placeholder: { type: 'plain_text', text: 'How are you doing', emoji: true },
              selected_option: {
                text: { type: 'plain_text', text: 'Neutral', emoji: true },
                value: 'Neutral'
              },
              action_ts: '1613049337.811564'
            }
        ], 
        user: {
            id: 'U01MUL1D',
            username: 'larry',
            name: 'larry',
            team_id: 'T01MB04'
        },
        trigger_id: '1734256224214.1725004347028.2d9e2e47fdb2a581fead7d620e',
        channel: { id: 'C01M51S', name: 'sourcing-talents' }
    };
    return {
      ...obj,
      ...override,
    };
  };