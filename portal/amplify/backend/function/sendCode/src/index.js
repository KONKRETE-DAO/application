/* Amplify Params - DO NOT EDIT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.API_konkretelockedportal_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_konkretelockedportal_GRAPHQLAPIKEYOUTPUT;

const query = /* GraphQL */ `
  query VisitorModel {
    listTodos {
      items {
        id
        name
        description
      }
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    /** @type {import('node-fetch').RequestInit} */
    const options = {
        method: 'POST',
        headers: {
            'x-api-key': GRAPHQL_API_KEY
        },
        body: JSON.stringify({ query, variables })
    };

    const request = new Request(GRAPHQL_ENDPOINT, options);



    return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
};
