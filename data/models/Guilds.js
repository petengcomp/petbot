module.exports = (sequelize, DataTypes) => {
    return sequelize.define('guilds', {
        guild_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        meeting: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        vote_time: {
            type: DataTypes.INTEGER,
            defaultValue: 15
        },
        topics_message_id: DataTypes.STRING,
        topics: DataTypes.TEXT,
        referrals: DataTypes.TEXT,
        birthdays: DataTypes.TEXT,
        done_topics: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        sent_since_meeting_start: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        max_messages_til_resend: {
            type: DataTypes.INTEGER,
            defaultValue: 10
        }
    }, {
        timestamps: false,
    });
};