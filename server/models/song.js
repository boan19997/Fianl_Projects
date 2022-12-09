const mongoose = require("mongoose");

const songSchema = mongoose.Schema(
    {
        name: {
            type : String,
            require : true,
        },
        imageURL: {
            type : String,
            require : true,
        },
        songURL: {
            type : String,
            require : true,
        },
        album: {
            type : String,
        },
        artist: {
            type : String,
            require : true,
        },
        language: {
            type : String,
            require : true,
        },
        category: {
            type : String,
            require : true,
        },
        user: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        listens: {
            type: Number,
            require : true,
            default: 0,
        }
    },
    { timestamps: true}
);

module.exports = mongoose.model("song", songSchema);