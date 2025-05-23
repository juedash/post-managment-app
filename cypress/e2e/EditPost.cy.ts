describe('Edit post end to end', () => {
  it('edits a post', () => {
    cy.intercept('GET', '/api/posts', { id: 1, title: 'Test title', body: 'Test body', userId: 1 })
    cy.visit('/posts/1')
    cy.contains('Edit').click()
    cy.get('input[name="title"]').type(' Updated title')
    cy.get('textarea[name="body"]').type('updated body')
    cy.get('select[name="userId"]').select('Ervin Howell')

    cy.contains('Save').click()
    cy.contains('Post was updated successfully!') // Assume you show a toast or message
  })
})
