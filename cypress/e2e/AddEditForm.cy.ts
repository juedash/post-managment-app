describe('AddEditForm', () => {
  it('check validation errors when fields are empty', () => {
    cy.visit('/posts/add')

    cy.get('input[name="title"]').clear()
    cy.get('textarea[name="body"]').clear()
    cy.contains('Save').click()

    cy.contains('Title is required')
    cy.contains('Author is required')
    cy.contains('Description is required')
  })
})
