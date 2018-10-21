
'use strict';

const _ = require('lodash');
const fs = require ('fs');

exports.read_completed_workflow = function (req, res) {
    
    var filteredProperties = [];

    try {
        if (isJSONEmpty(req.body))
            throw new Error('Could not decode request: JSON parsing failed');

        const propertyList = req.body.payload;
        
        // Filter the request payload by `type: htv` and `workflow: completed`
        var completedHTV = _.filter(propertyList, _.matches({ 'type': 'htv', 'workflow': 'completed' }));

        // Construct a new schema for response
        _.each(completedHTV, function(property) {
            filteredProperties.push({
                concataddress: getFullAddress(property.address),
                type: property.type,
                workflow: property.workflow
            });
        });

        writeToOutputFile(completedHTV);
        
        res.json(filteredProperties);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

exports.read_filtered_workflow = function (req, res) {
    var expression = {};
    var filteredProperties = [];

    try {
        if (req.params === undefined)
            throw new Error('Unable to provided filtered workflow: Missing filter criteria');

        if (isJSONEmpty(req.body))
            throw new Error('Could not decode request: JSON parsing failed');

        const params = req.params;
        const propertyList = req.body.payload;

        // Construct the query string to a JSON object to be used in _.match
        for (var key in params) {
            if(params.hasOwnProperty(key))
                expression[key] = params[key];
        }

        // Filter the request payload by parameters provided in the url
        var completedHTV = _.filter(propertyList, _.matches(expression));

        // Construct a new schema for response
        _.each(completedHTV, function(property) {
            filteredProperties.push({
                concataddress: getFullAddress(property.address),
                type: property.type,
                workflow: property.workflow
            });
        });

        // Write the Raw filtered payload into a JSON file for reference
        writeToOutputFile(completedHTV);
        
        res.json(filteredProperties);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

function writeToOutputFile(text) {
    fs.writeFile('./output/sample-data.json', JSON.stringify(text), function (err) {  
        // throws an error, you could also catch it here
        if (err) throw err;
    
        // success case, the file was saved
        console.log('output saved!');
    });
}

function getFullAddress(address) {
    if (address === undefined || address === null)
        throw new Error('Empty address');       
    
    var unitNumber = isEmptyOrNull(address.unitNumber) === true ? '' : address.unitNumber,
        buildingNumber = isEmptyOrNull(address.buildingNumber) === true ? '' : address.buildingNumber,
        street = isEmptyOrNull(address.street) === true ? '' : address.street,
        suburb = isEmptyOrNull(address.suburb) === true ? '' : address.suburb,
        state = isEmptyOrNull(address.state) === true ? '' : address.state,
        postcode = isEmptyOrNull(address.postcode) === true ? '' : address.postcode;

    return unitNumber + ' ' + buildingNumber + ' ' + street + ' ' + suburb + ' ' + state + ' ' + postcode; 
}

function isEmptyOrNull(property) {
    return property === undefined || property === null;
}

function isJSONEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}