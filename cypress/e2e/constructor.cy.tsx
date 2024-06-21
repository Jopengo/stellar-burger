const testUrl = 'http://localhost:4000';
const ingredientSelector = '[data-cy=ingredient-1]';
const modalSelector = '[data-cy=modalUI]';
const orderButtonSelector = '[data-cy=order-register-button]';
const bunTopSelector = '[data-cy=choose-bun-top]';
const bunBottomSelector = '[data-cy=choose-bun-bottom]';
const ingredientsSelector = '[data-cy=choose-ingredients]';

describe('проверяем доступность приложения', function () {
    beforeEach(function () {
        cy.setCookie('accessToken', '12345');
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('GET', 'api/auth/user', { fixture: 'getuser.json' });
        cy.intercept('POST', 'api/orders', { fixture: 'afterorder.json' }).as('postOrder');
        cy.intercept('POST', 'api/auth/login', { fixture: 'loginuser.json' });
        cy.visit(testUrl);
    });

    afterEach(function () {
        cy.clearCookie('accessToken');
        localStorage.removeItem('refreshToken');
    });

    it('добавление ингредиента из списка в конструктор', function () {
        cy.get(ingredientSelector).contains('Добавить').click();
        cy.get('[data-cy=constructor-bun-top]').contains('Краторная булка').should('exist');
        cy.get('[data-cy=constructor-bun-bottom]').contains('Краторная булка').should('exist');
        cy.get('[data-cy=ingredient-2]').contains('Добавить').click().click();
        cy.get('[data-cy=constructor-ingredients] > li').then((lis) => {
            expect(lis, '2 items').to.have.length(2);
            expect(lis.eq(0), 'first item').to.contain('Биокотлета из марсианской Магнолии');
            expect(lis.eq(1), 'second item').to.contain('Биокотлета из марсианской Магнолии');
        });
    });

    it('работа модальных окон', function () {
        cy.get('[data-cy=IngredientDetailsUI]').should('not.exist');
        cy.get(ingredientSelector + ' > a').click();
        cy.get(modalSelector).should('exist');
        cy.get('[data-cy=ingredient-name]').should('have.text', 'Краторная булка');
        cy.get('[data-cy=modal-close-button]').click();
        cy.get(modalSelector).should('not.exist');
        cy.get(ingredientSelector + ' > a').click();
        cy.get(modalSelector).should('exist');
        cy.get('[data-cy=modal-overlay]').click({ force: true });
        cy.get(modalSelector).should('not.exist');
    });

    it('фунцкионал создания заказа', function () {
        cy.get(ingredientSelector).contains('Добавить').click();
        cy.get('[data-cy=ingredient-2]').contains('Добавить').click().click();
        cy.get(orderButtonSelector).contains('Оформить заказ').click();
        cy.get(modalSelector).should('exist');
        cy.get('[data-cy=order-number]').should('have.text', '42216');
        cy.get('[data-cy=modal-close-button]').click();
        cy.get(modalSelector).should('not.exist');
        cy.get(bunTopSelector).should('have.text', 'Выберите булки');
        cy.get(bunBottomSelector).should('have.text', 'Выберите булки');
        cy.get(ingredientsSelector).should('have.text', 'Выберите начинку');
    });
});
