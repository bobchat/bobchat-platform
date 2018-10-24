"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    deviceUniqueId: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    created: {
        type: Date,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    phoneNumberVerifiedAt: {
        type: Date,
        required: false
    }
});
exports.User = mongoose_1.model("User", exports.UserSchema);
//# sourceMappingURL=User.js.map