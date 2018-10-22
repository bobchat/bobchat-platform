/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

/**
 * StatusCode enum.
 * @exports StatusCode
 * @enum {string}
 * @property {number} UNKNOWN_CODE=0 UNKNOWN_CODE value
 * @property {number} OK=200 OK value
 * @property {number} BAD_REQUEST=400 BAD_REQUEST value
 * @property {number} UNAUTHORIZED=401 UNAUTHORIZED value
 * @property {number} FORBIDDEN=403 FORBIDDEN value
 * @property {number} UNPROCESSABLE_ENTITY=422 UNPROCESSABLE_ENTITY value
 * @property {number} INTERNAL_SERVER_ERROR=500 INTERNAL_SERVER_ERROR value
 * @property {number} GATEWAY_TIMEOUT=504 GATEWAY_TIMEOUT value
 */
$root.StatusCode = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "UNKNOWN_CODE"] = 0;
    values[valuesById[200] = "OK"] = 200;
    values[valuesById[400] = "BAD_REQUEST"] = 400;
    values[valuesById[401] = "UNAUTHORIZED"] = 401;
    values[valuesById[403] = "FORBIDDEN"] = 403;
    values[valuesById[422] = "UNPROCESSABLE_ENTITY"] = 422;
    values[valuesById[500] = "INTERNAL_SERVER_ERROR"] = 500;
    values[valuesById[504] = "GATEWAY_TIMEOUT"] = 504;
    return values;
})();

$root.Error = (function() {

    /**
     * Properties of an Error.
     * @exports IError
     * @interface IError
     * @property {string|null} [key] Error key
     * @property {string|null} [message] Error message
     */

    /**
     * Constructs a new Error.
     * @exports Error
     * @classdesc Represents an Error.
     * @implements IError
     * @constructor
     * @param {IError=} [properties] Properties to set
     */
    function Error(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Error key.
     * @member {string} key
     * @memberof Error
     * @instance
     */
    Error.prototype.key = "";

    /**
     * Error message.
     * @member {string} message
     * @memberof Error
     * @instance
     */
    Error.prototype.message = "";

    /**
     * Creates a new Error instance using the specified properties.
     * @function create
     * @memberof Error
     * @static
     * @param {IError=} [properties] Properties to set
     * @returns {Error} Error instance
     */
    Error.create = function create(properties) {
        return new Error(properties);
    };

    /**
     * Encodes the specified Error message. Does not implicitly {@link Error.verify|verify} messages.
     * @function encode
     * @memberof Error
     * @static
     * @param {IError} message Error message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Error.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.key != null && message.hasOwnProperty("key"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
        if (message.message != null && message.hasOwnProperty("message"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
        return writer;
    };

    /**
     * Encodes the specified Error message, length delimited. Does not implicitly {@link Error.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Error
     * @static
     * @param {IError} message Error message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Error.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an Error message from the specified reader or buffer.
     * @function decode
     * @memberof Error
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Error} Error
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Error.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Error();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.key = reader.string();
                break;
            case 2:
                message.message = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an Error message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Error
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Error} Error
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Error.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an Error message.
     * @function verify
     * @memberof Error
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Error.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.key != null && message.hasOwnProperty("key"))
            if (!$util.isString(message.key))
                return "key: string expected";
        if (message.message != null && message.hasOwnProperty("message"))
            if (!$util.isString(message.message))
                return "message: string expected";
        return null;
    };

    /**
     * Creates an Error message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Error
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Error} Error
     */
    Error.fromObject = function fromObject(object) {
        if (object instanceof $root.Error)
            return object;
        var message = new $root.Error();
        if (object.key != null)
            message.key = String(object.key);
        if (object.message != null)
            message.message = String(object.message);
        return message;
    };

    /**
     * Creates a plain object from an Error message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Error
     * @static
     * @param {Error} message Error
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Error.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.key = "";
            object.message = "";
        }
        if (message.key != null && message.hasOwnProperty("key"))
            object.key = message.key;
        if (message.message != null && message.hasOwnProperty("message"))
            object.message = message.message;
        return object;
    };

    /**
     * Converts this Error to JSON.
     * @function toJSON
     * @memberof Error
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Error.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Error;
})();

$root.User = (function() {

    /**
     * Properties of a User.
     * @exports IUser
     * @interface IUser
     * @property {string|null} [id] User id
     * @property {string|null} [deviceUniqueId] User deviceUniqueId
     * @property {string|null} [username] User username
     * @property {number|Long|null} [created] User created
     * @property {string|null} [phoneNumber] User phoneNumber
     * @property {number|Long|null} [phoneNumberVerifiedAt] User phoneNumberVerifiedAt
     */

    /**
     * Constructs a new User.
     * @exports User
     * @classdesc Represents a User.
     * @implements IUser
     * @constructor
     * @param {IUser=} [properties] Properties to set
     */
    function User(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * User id.
     * @member {string} id
     * @memberof User
     * @instance
     */
    User.prototype.id = "";

    /**
     * User deviceUniqueId.
     * @member {string} deviceUniqueId
     * @memberof User
     * @instance
     */
    User.prototype.deviceUniqueId = "";

    /**
     * User username.
     * @member {string} username
     * @memberof User
     * @instance
     */
    User.prototype.username = "";

    /**
     * User created.
     * @member {number|Long} created
     * @memberof User
     * @instance
     */
    User.prototype.created = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * User phoneNumber.
     * @member {string} phoneNumber
     * @memberof User
     * @instance
     */
    User.prototype.phoneNumber = "";

    /**
     * User phoneNumberVerifiedAt.
     * @member {number|Long} phoneNumberVerifiedAt
     * @memberof User
     * @instance
     */
    User.prototype.phoneNumberVerifiedAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new User instance using the specified properties.
     * @function create
     * @memberof User
     * @static
     * @param {IUser=} [properties] Properties to set
     * @returns {User} User instance
     */
    User.create = function create(properties) {
        return new User(properties);
    };

    /**
     * Encodes the specified User message. Does not implicitly {@link User.verify|verify} messages.
     * @function encode
     * @memberof User
     * @static
     * @param {IUser} message User message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    User.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
        if (message.deviceUniqueId != null && message.hasOwnProperty("deviceUniqueId"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.deviceUniqueId);
        if (message.username != null && message.hasOwnProperty("username"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.username);
        if (message.created != null && message.hasOwnProperty("created"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.created);
        if (message.phoneNumber != null && message.hasOwnProperty("phoneNumber"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.phoneNumber);
        if (message.phoneNumberVerifiedAt != null && message.hasOwnProperty("phoneNumberVerifiedAt"))
            writer.uint32(/* id 6, wireType 0 =*/48).int64(message.phoneNumberVerifiedAt);
        return writer;
    };

    /**
     * Encodes the specified User message, length delimited. Does not implicitly {@link User.verify|verify} messages.
     * @function encodeDelimited
     * @memberof User
     * @static
     * @param {IUser} message User message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    User.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a User message from the specified reader or buffer.
     * @function decode
     * @memberof User
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {User} User
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    User.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.User();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.id = reader.string();
                break;
            case 2:
                message.deviceUniqueId = reader.string();
                break;
            case 3:
                message.username = reader.string();
                break;
            case 4:
                message.created = reader.int64();
                break;
            case 5:
                message.phoneNumber = reader.string();
                break;
            case 6:
                message.phoneNumberVerifiedAt = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a User message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof User
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {User} User
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    User.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a User message.
     * @function verify
     * @memberof User
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    User.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.deviceUniqueId != null && message.hasOwnProperty("deviceUniqueId"))
            if (!$util.isString(message.deviceUniqueId))
                return "deviceUniqueId: string expected";
        if (message.username != null && message.hasOwnProperty("username"))
            if (!$util.isString(message.username))
                return "username: string expected";
        if (message.created != null && message.hasOwnProperty("created"))
            if (!$util.isInteger(message.created) && !(message.created && $util.isInteger(message.created.low) && $util.isInteger(message.created.high)))
                return "created: integer|Long expected";
        if (message.phoneNumber != null && message.hasOwnProperty("phoneNumber"))
            if (!$util.isString(message.phoneNumber))
                return "phoneNumber: string expected";
        if (message.phoneNumberVerifiedAt != null && message.hasOwnProperty("phoneNumberVerifiedAt"))
            if (!$util.isInteger(message.phoneNumberVerifiedAt) && !(message.phoneNumberVerifiedAt && $util.isInteger(message.phoneNumberVerifiedAt.low) && $util.isInteger(message.phoneNumberVerifiedAt.high)))
                return "phoneNumberVerifiedAt: integer|Long expected";
        return null;
    };

    /**
     * Creates a User message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof User
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {User} User
     */
    User.fromObject = function fromObject(object) {
        if (object instanceof $root.User)
            return object;
        var message = new $root.User();
        if (object.id != null)
            message.id = String(object.id);
        if (object.deviceUniqueId != null)
            message.deviceUniqueId = String(object.deviceUniqueId);
        if (object.username != null)
            message.username = String(object.username);
        if (object.created != null)
            if ($util.Long)
                (message.created = $util.Long.fromValue(object.created)).unsigned = false;
            else if (typeof object.created === "string")
                message.created = parseInt(object.created, 10);
            else if (typeof object.created === "number")
                message.created = object.created;
            else if (typeof object.created === "object")
                message.created = new $util.LongBits(object.created.low >>> 0, object.created.high >>> 0).toNumber();
        if (object.phoneNumber != null)
            message.phoneNumber = String(object.phoneNumber);
        if (object.phoneNumberVerifiedAt != null)
            if ($util.Long)
                (message.phoneNumberVerifiedAt = $util.Long.fromValue(object.phoneNumberVerifiedAt)).unsigned = false;
            else if (typeof object.phoneNumberVerifiedAt === "string")
                message.phoneNumberVerifiedAt = parseInt(object.phoneNumberVerifiedAt, 10);
            else if (typeof object.phoneNumberVerifiedAt === "number")
                message.phoneNumberVerifiedAt = object.phoneNumberVerifiedAt;
            else if (typeof object.phoneNumberVerifiedAt === "object")
                message.phoneNumberVerifiedAt = new $util.LongBits(object.phoneNumberVerifiedAt.low >>> 0, object.phoneNumberVerifiedAt.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a User message. Also converts values to other types if specified.
     * @function toObject
     * @memberof User
     * @static
     * @param {User} message User
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    User.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.id = "";
            object.deviceUniqueId = "";
            object.username = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.created = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.created = options.longs === String ? "0" : 0;
            object.phoneNumber = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.phoneNumberVerifiedAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.phoneNumberVerifiedAt = options.longs === String ? "0" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.deviceUniqueId != null && message.hasOwnProperty("deviceUniqueId"))
            object.deviceUniqueId = message.deviceUniqueId;
        if (message.username != null && message.hasOwnProperty("username"))
            object.username = message.username;
        if (message.created != null && message.hasOwnProperty("created"))
            if (typeof message.created === "number")
                object.created = options.longs === String ? String(message.created) : message.created;
            else
                object.created = options.longs === String ? $util.Long.prototype.toString.call(message.created) : options.longs === Number ? new $util.LongBits(message.created.low >>> 0, message.created.high >>> 0).toNumber() : message.created;
        if (message.phoneNumber != null && message.hasOwnProperty("phoneNumber"))
            object.phoneNumber = message.phoneNumber;
        if (message.phoneNumberVerifiedAt != null && message.hasOwnProperty("phoneNumberVerifiedAt"))
            if (typeof message.phoneNumberVerifiedAt === "number")
                object.phoneNumberVerifiedAt = options.longs === String ? String(message.phoneNumberVerifiedAt) : message.phoneNumberVerifiedAt;
            else
                object.phoneNumberVerifiedAt = options.longs === String ? $util.Long.prototype.toString.call(message.phoneNumberVerifiedAt) : options.longs === Number ? new $util.LongBits(message.phoneNumberVerifiedAt.low >>> 0, message.phoneNumberVerifiedAt.high >>> 0).toNumber() : message.phoneNumberVerifiedAt;
        return object;
    };

    /**
     * Converts this User to JSON.
     * @function toJSON
     * @memberof User
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    User.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return User;
})();

$root.CreateUserRequest = (function() {

    /**
     * Properties of a CreateUserRequest.
     * @exports ICreateUserRequest
     * @interface ICreateUserRequest
     * @property {string|null} [spanContext] CreateUserRequest spanContext
     * @property {IUser|null} [user] CreateUserRequest user
     */

    /**
     * Constructs a new CreateUserRequest.
     * @exports CreateUserRequest
     * @classdesc Represents a CreateUserRequest.
     * @implements ICreateUserRequest
     * @constructor
     * @param {ICreateUserRequest=} [properties] Properties to set
     */
    function CreateUserRequest(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CreateUserRequest spanContext.
     * @member {string} spanContext
     * @memberof CreateUserRequest
     * @instance
     */
    CreateUserRequest.prototype.spanContext = "";

    /**
     * CreateUserRequest user.
     * @member {IUser|null|undefined} user
     * @memberof CreateUserRequest
     * @instance
     */
    CreateUserRequest.prototype.user = null;

    /**
     * Creates a new CreateUserRequest instance using the specified properties.
     * @function create
     * @memberof CreateUserRequest
     * @static
     * @param {ICreateUserRequest=} [properties] Properties to set
     * @returns {CreateUserRequest} CreateUserRequest instance
     */
    CreateUserRequest.create = function create(properties) {
        return new CreateUserRequest(properties);
    };

    /**
     * Encodes the specified CreateUserRequest message. Does not implicitly {@link CreateUserRequest.verify|verify} messages.
     * @function encode
     * @memberof CreateUserRequest
     * @static
     * @param {ICreateUserRequest} message CreateUserRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CreateUserRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.spanContext != null && message.hasOwnProperty("spanContext"))
            writer.uint32(/* id 0, wireType 2 =*/2).string(message.spanContext);
        if (message.user != null && message.hasOwnProperty("user"))
            $root.User.encode(message.user, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified CreateUserRequest message, length delimited. Does not implicitly {@link CreateUserRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CreateUserRequest
     * @static
     * @param {ICreateUserRequest} message CreateUserRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CreateUserRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CreateUserRequest message from the specified reader or buffer.
     * @function decode
     * @memberof CreateUserRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CreateUserRequest} CreateUserRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CreateUserRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CreateUserRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 0:
                message.spanContext = reader.string();
                break;
            case 1:
                message.user = $root.User.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CreateUserRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CreateUserRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CreateUserRequest} CreateUserRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CreateUserRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CreateUserRequest message.
     * @function verify
     * @memberof CreateUserRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CreateUserRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.spanContext != null && message.hasOwnProperty("spanContext"))
            if (!$util.isString(message.spanContext))
                return "spanContext: string expected";
        if (message.user != null && message.hasOwnProperty("user")) {
            var error = $root.User.verify(message.user);
            if (error)
                return "user." + error;
        }
        return null;
    };

    /**
     * Creates a CreateUserRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CreateUserRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CreateUserRequest} CreateUserRequest
     */
    CreateUserRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.CreateUserRequest)
            return object;
        var message = new $root.CreateUserRequest();
        if (object.spanContext != null)
            message.spanContext = String(object.spanContext);
        if (object.user != null) {
            if (typeof object.user !== "object")
                throw TypeError(".CreateUserRequest.user: object expected");
            message.user = $root.User.fromObject(object.user);
        }
        return message;
    };

    /**
     * Creates a plain object from a CreateUserRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CreateUserRequest
     * @static
     * @param {CreateUserRequest} message CreateUserRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CreateUserRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.spanContext = "";
            object.user = null;
        }
        if (message.spanContext != null && message.hasOwnProperty("spanContext"))
            object.spanContext = message.spanContext;
        if (message.user != null && message.hasOwnProperty("user"))
            object.user = $root.User.toObject(message.user, options);
        return object;
    };

    /**
     * Converts this CreateUserRequest to JSON.
     * @function toJSON
     * @memberof CreateUserRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CreateUserRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CreateUserRequest;
})();

$root.CreateUserResponse = (function() {

    /**
     * Properties of a CreateUserResponse.
     * @exports ICreateUserResponse
     * @interface ICreateUserResponse
     * @property {StatusCode|null} [status] CreateUserResponse status
     * @property {Array.<IError>|null} [errors] CreateUserResponse errors
     * @property {IUser|null} [user] CreateUserResponse user
     */

    /**
     * Constructs a new CreateUserResponse.
     * @exports CreateUserResponse
     * @classdesc Represents a CreateUserResponse.
     * @implements ICreateUserResponse
     * @constructor
     * @param {ICreateUserResponse=} [properties] Properties to set
     */
    function CreateUserResponse(properties) {
        this.errors = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CreateUserResponse status.
     * @member {StatusCode} status
     * @memberof CreateUserResponse
     * @instance
     */
    CreateUserResponse.prototype.status = 0;

    /**
     * CreateUserResponse errors.
     * @member {Array.<IError>} errors
     * @memberof CreateUserResponse
     * @instance
     */
    CreateUserResponse.prototype.errors = $util.emptyArray;

    /**
     * CreateUserResponse user.
     * @member {IUser|null|undefined} user
     * @memberof CreateUserResponse
     * @instance
     */
    CreateUserResponse.prototype.user = null;

    /**
     * Creates a new CreateUserResponse instance using the specified properties.
     * @function create
     * @memberof CreateUserResponse
     * @static
     * @param {ICreateUserResponse=} [properties] Properties to set
     * @returns {CreateUserResponse} CreateUserResponse instance
     */
    CreateUserResponse.create = function create(properties) {
        return new CreateUserResponse(properties);
    };

    /**
     * Encodes the specified CreateUserResponse message. Does not implicitly {@link CreateUserResponse.verify|verify} messages.
     * @function encode
     * @memberof CreateUserResponse
     * @static
     * @param {ICreateUserResponse} message CreateUserResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CreateUserResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.status != null && message.hasOwnProperty("status"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
        if (message.errors != null && message.errors.length)
            for (var i = 0; i < message.errors.length; ++i)
                $root.Error.encode(message.errors[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.user != null && message.hasOwnProperty("user"))
            $root.User.encode(message.user, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified CreateUserResponse message, length delimited. Does not implicitly {@link CreateUserResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CreateUserResponse
     * @static
     * @param {ICreateUserResponse} message CreateUserResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CreateUserResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CreateUserResponse message from the specified reader or buffer.
     * @function decode
     * @memberof CreateUserResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CreateUserResponse} CreateUserResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CreateUserResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CreateUserResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.status = reader.int32();
                break;
            case 2:
                if (!(message.errors && message.errors.length))
                    message.errors = [];
                message.errors.push($root.Error.decode(reader, reader.uint32()));
                break;
            case 3:
                message.user = $root.User.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a CreateUserResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CreateUserResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CreateUserResponse} CreateUserResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CreateUserResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CreateUserResponse message.
     * @function verify
     * @memberof CreateUserResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CreateUserResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.status != null && message.hasOwnProperty("status"))
            switch (message.status) {
            default:
                return "status: enum value expected";
            case 0:
            case 200:
            case 400:
            case 401:
            case 403:
            case 422:
            case 500:
            case 504:
                break;
            }
        if (message.errors != null && message.hasOwnProperty("errors")) {
            if (!Array.isArray(message.errors))
                return "errors: array expected";
            for (var i = 0; i < message.errors.length; ++i) {
                var error = $root.Error.verify(message.errors[i]);
                if (error)
                    return "errors." + error;
            }
        }
        if (message.user != null && message.hasOwnProperty("user")) {
            var error = $root.User.verify(message.user);
            if (error)
                return "user." + error;
        }
        return null;
    };

    /**
     * Creates a CreateUserResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CreateUserResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CreateUserResponse} CreateUserResponse
     */
    CreateUserResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.CreateUserResponse)
            return object;
        var message = new $root.CreateUserResponse();
        switch (object.status) {
        case "UNKNOWN_CODE":
        case 0:
            message.status = 0;
            break;
        case "OK":
        case 200:
            message.status = 200;
            break;
        case "BAD_REQUEST":
        case 400:
            message.status = 400;
            break;
        case "UNAUTHORIZED":
        case 401:
            message.status = 401;
            break;
        case "FORBIDDEN":
        case 403:
            message.status = 403;
            break;
        case "UNPROCESSABLE_ENTITY":
        case 422:
            message.status = 422;
            break;
        case "INTERNAL_SERVER_ERROR":
        case 500:
            message.status = 500;
            break;
        case "GATEWAY_TIMEOUT":
        case 504:
            message.status = 504;
            break;
        }
        if (object.errors) {
            if (!Array.isArray(object.errors))
                throw TypeError(".CreateUserResponse.errors: array expected");
            message.errors = [];
            for (var i = 0; i < object.errors.length; ++i) {
                if (typeof object.errors[i] !== "object")
                    throw TypeError(".CreateUserResponse.errors: object expected");
                message.errors[i] = $root.Error.fromObject(object.errors[i]);
            }
        }
        if (object.user != null) {
            if (typeof object.user !== "object")
                throw TypeError(".CreateUserResponse.user: object expected");
            message.user = $root.User.fromObject(object.user);
        }
        return message;
    };

    /**
     * Creates a plain object from a CreateUserResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CreateUserResponse
     * @static
     * @param {CreateUserResponse} message CreateUserResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    CreateUserResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.errors = [];
        if (options.defaults) {
            object.status = options.enums === String ? "UNKNOWN_CODE" : 0;
            object.user = null;
        }
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = options.enums === String ? $root.StatusCode[message.status] : message.status;
        if (message.errors && message.errors.length) {
            object.errors = [];
            for (var j = 0; j < message.errors.length; ++j)
                object.errors[j] = $root.Error.toObject(message.errors[j], options);
        }
        if (message.user != null && message.hasOwnProperty("user"))
            object.user = $root.User.toObject(message.user, options);
        return object;
    };

    /**
     * Converts this CreateUserResponse to JSON.
     * @function toJSON
     * @memberof CreateUserResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CreateUserResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CreateUserResponse;
})();

$root.AuthUserRequest = (function() {

    /**
     * Properties of an AuthUserRequest.
     * @exports IAuthUserRequest
     * @interface IAuthUserRequest
     * @property {string|null} [spanContext] AuthUserRequest spanContext
     * @property {IUser|null} [user] AuthUserRequest user
     */

    /**
     * Constructs a new AuthUserRequest.
     * @exports AuthUserRequest
     * @classdesc Represents an AuthUserRequest.
     * @implements IAuthUserRequest
     * @constructor
     * @param {IAuthUserRequest=} [properties] Properties to set
     */
    function AuthUserRequest(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AuthUserRequest spanContext.
     * @member {string} spanContext
     * @memberof AuthUserRequest
     * @instance
     */
    AuthUserRequest.prototype.spanContext = "";

    /**
     * AuthUserRequest user.
     * @member {IUser|null|undefined} user
     * @memberof AuthUserRequest
     * @instance
     */
    AuthUserRequest.prototype.user = null;

    /**
     * Creates a new AuthUserRequest instance using the specified properties.
     * @function create
     * @memberof AuthUserRequest
     * @static
     * @param {IAuthUserRequest=} [properties] Properties to set
     * @returns {AuthUserRequest} AuthUserRequest instance
     */
    AuthUserRequest.create = function create(properties) {
        return new AuthUserRequest(properties);
    };

    /**
     * Encodes the specified AuthUserRequest message. Does not implicitly {@link AuthUserRequest.verify|verify} messages.
     * @function encode
     * @memberof AuthUserRequest
     * @static
     * @param {IAuthUserRequest} message AuthUserRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthUserRequest.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.spanContext != null && message.hasOwnProperty("spanContext"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.spanContext);
        if (message.user != null && message.hasOwnProperty("user"))
            $root.User.encode(message.user, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified AuthUserRequest message, length delimited. Does not implicitly {@link AuthUserRequest.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AuthUserRequest
     * @static
     * @param {IAuthUserRequest} message AuthUserRequest message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthUserRequest.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AuthUserRequest message from the specified reader or buffer.
     * @function decode
     * @memberof AuthUserRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AuthUserRequest} AuthUserRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthUserRequest.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AuthUserRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.spanContext = reader.string();
                break;
            case 2:
                message.user = $root.User.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AuthUserRequest message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AuthUserRequest
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AuthUserRequest} AuthUserRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthUserRequest.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AuthUserRequest message.
     * @function verify
     * @memberof AuthUserRequest
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AuthUserRequest.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.spanContext != null && message.hasOwnProperty("spanContext"))
            if (!$util.isString(message.spanContext))
                return "spanContext: string expected";
        if (message.user != null && message.hasOwnProperty("user")) {
            var error = $root.User.verify(message.user);
            if (error)
                return "user." + error;
        }
        return null;
    };

    /**
     * Creates an AuthUserRequest message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AuthUserRequest
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AuthUserRequest} AuthUserRequest
     */
    AuthUserRequest.fromObject = function fromObject(object) {
        if (object instanceof $root.AuthUserRequest)
            return object;
        var message = new $root.AuthUserRequest();
        if (object.spanContext != null)
            message.spanContext = String(object.spanContext);
        if (object.user != null) {
            if (typeof object.user !== "object")
                throw TypeError(".AuthUserRequest.user: object expected");
            message.user = $root.User.fromObject(object.user);
        }
        return message;
    };

    /**
     * Creates a plain object from an AuthUserRequest message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AuthUserRequest
     * @static
     * @param {AuthUserRequest} message AuthUserRequest
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AuthUserRequest.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.spanContext = "";
            object.user = null;
        }
        if (message.spanContext != null && message.hasOwnProperty("spanContext"))
            object.spanContext = message.spanContext;
        if (message.user != null && message.hasOwnProperty("user"))
            object.user = $root.User.toObject(message.user, options);
        return object;
    };

    /**
     * Converts this AuthUserRequest to JSON.
     * @function toJSON
     * @memberof AuthUserRequest
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AuthUserRequest.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AuthUserRequest;
})();

$root.AuthUserResponse = (function() {

    /**
     * Properties of an AuthUserResponse.
     * @exports IAuthUserResponse
     * @interface IAuthUserResponse
     * @property {StatusCode|null} [status] AuthUserResponse status
     * @property {Array.<IError>|null} [errors] AuthUserResponse errors
     * @property {IUser|null} [user] AuthUserResponse user
     */

    /**
     * Constructs a new AuthUserResponse.
     * @exports AuthUserResponse
     * @classdesc Represents an AuthUserResponse.
     * @implements IAuthUserResponse
     * @constructor
     * @param {IAuthUserResponse=} [properties] Properties to set
     */
    function AuthUserResponse(properties) {
        this.errors = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * AuthUserResponse status.
     * @member {StatusCode} status
     * @memberof AuthUserResponse
     * @instance
     */
    AuthUserResponse.prototype.status = 0;

    /**
     * AuthUserResponse errors.
     * @member {Array.<IError>} errors
     * @memberof AuthUserResponse
     * @instance
     */
    AuthUserResponse.prototype.errors = $util.emptyArray;

    /**
     * AuthUserResponse user.
     * @member {IUser|null|undefined} user
     * @memberof AuthUserResponse
     * @instance
     */
    AuthUserResponse.prototype.user = null;

    /**
     * Creates a new AuthUserResponse instance using the specified properties.
     * @function create
     * @memberof AuthUserResponse
     * @static
     * @param {IAuthUserResponse=} [properties] Properties to set
     * @returns {AuthUserResponse} AuthUserResponse instance
     */
    AuthUserResponse.create = function create(properties) {
        return new AuthUserResponse(properties);
    };

    /**
     * Encodes the specified AuthUserResponse message. Does not implicitly {@link AuthUserResponse.verify|verify} messages.
     * @function encode
     * @memberof AuthUserResponse
     * @static
     * @param {IAuthUserResponse} message AuthUserResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthUserResponse.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.status != null && message.hasOwnProperty("status"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.status);
        if (message.errors != null && message.errors.length)
            for (var i = 0; i < message.errors.length; ++i)
                $root.Error.encode(message.errors[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.user != null && message.hasOwnProperty("user"))
            $root.User.encode(message.user, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified AuthUserResponse message, length delimited. Does not implicitly {@link AuthUserResponse.verify|verify} messages.
     * @function encodeDelimited
     * @memberof AuthUserResponse
     * @static
     * @param {IAuthUserResponse} message AuthUserResponse message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    AuthUserResponse.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an AuthUserResponse message from the specified reader or buffer.
     * @function decode
     * @memberof AuthUserResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {AuthUserResponse} AuthUserResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthUserResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.AuthUserResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.status = reader.int32();
                break;
            case 2:
                if (!(message.errors && message.errors.length))
                    message.errors = [];
                message.errors.push($root.Error.decode(reader, reader.uint32()));
                break;
            case 3:
                message.user = $root.User.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes an AuthUserResponse message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof AuthUserResponse
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {AuthUserResponse} AuthUserResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    AuthUserResponse.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an AuthUserResponse message.
     * @function verify
     * @memberof AuthUserResponse
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    AuthUserResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.status != null && message.hasOwnProperty("status"))
            switch (message.status) {
            default:
                return "status: enum value expected";
            case 0:
            case 200:
            case 400:
            case 401:
            case 403:
            case 422:
            case 500:
            case 504:
                break;
            }
        if (message.errors != null && message.hasOwnProperty("errors")) {
            if (!Array.isArray(message.errors))
                return "errors: array expected";
            for (var i = 0; i < message.errors.length; ++i) {
                var error = $root.Error.verify(message.errors[i]);
                if (error)
                    return "errors." + error;
            }
        }
        if (message.user != null && message.hasOwnProperty("user")) {
            var error = $root.User.verify(message.user);
            if (error)
                return "user." + error;
        }
        return null;
    };

    /**
     * Creates an AuthUserResponse message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof AuthUserResponse
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {AuthUserResponse} AuthUserResponse
     */
    AuthUserResponse.fromObject = function fromObject(object) {
        if (object instanceof $root.AuthUserResponse)
            return object;
        var message = new $root.AuthUserResponse();
        switch (object.status) {
        case "UNKNOWN_CODE":
        case 0:
            message.status = 0;
            break;
        case "OK":
        case 200:
            message.status = 200;
            break;
        case "BAD_REQUEST":
        case 400:
            message.status = 400;
            break;
        case "UNAUTHORIZED":
        case 401:
            message.status = 401;
            break;
        case "FORBIDDEN":
        case 403:
            message.status = 403;
            break;
        case "UNPROCESSABLE_ENTITY":
        case 422:
            message.status = 422;
            break;
        case "INTERNAL_SERVER_ERROR":
        case 500:
            message.status = 500;
            break;
        case "GATEWAY_TIMEOUT":
        case 504:
            message.status = 504;
            break;
        }
        if (object.errors) {
            if (!Array.isArray(object.errors))
                throw TypeError(".AuthUserResponse.errors: array expected");
            message.errors = [];
            for (var i = 0; i < object.errors.length; ++i) {
                if (typeof object.errors[i] !== "object")
                    throw TypeError(".AuthUserResponse.errors: object expected");
                message.errors[i] = $root.Error.fromObject(object.errors[i]);
            }
        }
        if (object.user != null) {
            if (typeof object.user !== "object")
                throw TypeError(".AuthUserResponse.user: object expected");
            message.user = $root.User.fromObject(object.user);
        }
        return message;
    };

    /**
     * Creates a plain object from an AuthUserResponse message. Also converts values to other types if specified.
     * @function toObject
     * @memberof AuthUserResponse
     * @static
     * @param {AuthUserResponse} message AuthUserResponse
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    AuthUserResponse.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.errors = [];
        if (options.defaults) {
            object.status = options.enums === String ? "UNKNOWN_CODE" : 0;
            object.user = null;
        }
        if (message.status != null && message.hasOwnProperty("status"))
            object.status = options.enums === String ? $root.StatusCode[message.status] : message.status;
        if (message.errors && message.errors.length) {
            object.errors = [];
            for (var j = 0; j < message.errors.length; ++j)
                object.errors[j] = $root.Error.toObject(message.errors[j], options);
        }
        if (message.user != null && message.hasOwnProperty("user"))
            object.user = $root.User.toObject(message.user, options);
        return object;
    };

    /**
     * Converts this AuthUserResponse to JSON.
     * @function toJSON
     * @memberof AuthUserResponse
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    AuthUserResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return AuthUserResponse;
})();

$root.UserService = (function() {

    /**
     * Constructs a new UserService service.
     * @exports UserService
     * @classdesc Represents a UserService
     * @extends $protobuf.rpc.Service
     * @constructor
     * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
     */
    function UserService(rpcImpl, requestDelimited, responseDelimited) {
        $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
    }

    (UserService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = UserService;

    /**
     * Creates new UserService service using the specified rpc implementation.
     * @function create
     * @memberof UserService
     * @static
     * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
     * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
     * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
     * @returns {UserService} RPC service. Useful where requests and/or responses are streamed.
     */
    UserService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
        return new this(rpcImpl, requestDelimited, responseDelimited);
    };

    /**
     * Callback as used by {@link UserService#authUser}.
     * @memberof UserService
     * @typedef AuthUserCallback
     * @type {function}
     * @param {Error|null} error Error, if any
     * @param {AuthUserResponse} [response] AuthUserResponse
     */

    /**
     * Calls AuthUser.
     * @function authUser
     * @memberof UserService
     * @instance
     * @param {IAuthUserRequest} request AuthUserRequest message or plain object
     * @param {UserService.AuthUserCallback} callback Node-style callback called with the error, if any, and AuthUserResponse
     * @returns {undefined}
     * @variation 1
     */
    Object.defineProperty(UserService.prototype.authUser = function authUser(request, callback) {
        return this.rpcCall(authUser, $root.AuthUserRequest, $root.AuthUserResponse, request, callback);
    }, "name", { value: "AuthUser" });

    /**
     * Calls AuthUser.
     * @function authUser
     * @memberof UserService
     * @instance
     * @param {IAuthUserRequest} request AuthUserRequest message or plain object
     * @returns {Promise<AuthUserResponse>} Promise
     * @variation 2
     */

    return UserService;
})();

module.exports = $root;
