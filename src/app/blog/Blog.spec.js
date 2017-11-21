/**
 * Example spec file demonstrating a Jasmine test.
 *
 * @see {@link https://jasmine.github.io/2.5/introduction}
 */

import React from "react";
import ReactTestUtils from "react-addons-test-utils";

import { Blog } from "./Blog";

xdescribe("Blog", function() {
  let component;

  beforeEach(function() {
    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<Blog />);
    component = renderer.getRenderOutput();
  });

  it("contains spec that returns true", function() {
    expect(true).toBe(true);
  });
});




describe('Blog API', function() {
    it("should return api", function(){
    	fetch(`http://localhost:9001/posts`)
        .then(response => response.json())
        .then(data => process.stdout.write(data))
    })
});