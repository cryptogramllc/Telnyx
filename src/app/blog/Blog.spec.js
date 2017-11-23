/**
 * Example spec file demonstrating a Jasmine test.
 *
 * @see {@link https://jasmine.github.io/2.5/introduction}
 */

import React from "react";
import ReactTestUtils from "react-addons-test-utils";

import { Blog } from "./Blog";

describe("Blog", function() {
  let component, renderer;
  beforeEach(function() {
    renderer = ReactTestUtils.createRenderer();
    renderer.render(<Blog />);
    component = renderer.getRenderOutput();
  });
  it('should contain all elements from the json object', function(){
      // var blog = renderer.render(<Blog />);
      expect(component).contains("div.bananana");
  
  })

  it("contains spec that returns true", function() {
    expect(true).toBe(true);
  });
});






