/**
 * New node file
 */
it('should change state', function() {
  var choice = element(by.binding('choice.name'));

  expect(choice.getText()).toContain('');

  element.all(by.model('choice.name')).get(0).click();

  expect(choice.getText()).toContain('red');
});
