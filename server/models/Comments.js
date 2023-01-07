module.exports = (sequelize, DataTypes) => {
    // creating comments table
    const Comments = sequelize.define("Comments", {
        commentBody: {
            type: DataTypes.STRING,
            allowNULL: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNULL: false,
        }
    });
    return Comments;
}