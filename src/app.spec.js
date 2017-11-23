/**
 * Example spec file demonstrating a Jasmine test.
 *
 * @see {@link https://jasmine.github.io/2.5/introduction}
 */

import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import App from "./app/App";
import fetch from 'isomorphic-fetch';


require('es6-promise').polyfill();



describe("App test suite", function() {
  let component;

  beforeEach(function() {
    component = ReactTestUtils.renderIntoDocument(<App />);
  });

  it("contains spec that returns true", function() {
    expect(true).toBe(true);
  });
});


describe('API', function() {
    it("should return api", function(){
    	fetch(`http://localhost:9001/posts`)
        .then(response => response.json())
        .then(data => {
        	console.log(data);
           expect(data.id).toBe(1);     
        });


    })
});