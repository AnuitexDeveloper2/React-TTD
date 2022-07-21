import * as React from "react";
import { createContainer } from "./DomManipulators";
import CustomerForm from "../src/components/common/CustomerForm";
import ReactTestUtils from "react-dom/test-utils";
import { Customer } from "../src/types/Appointment";

describe("<CustomerForm/>", () => {
  let render: (component: JSX.Element) => void;
  let container: HTMLDivElement;

  const form = (id: string) => container.querySelector(`form[id=${id}]`);

  const field = (name: string) =>
    form("customer")?.querySelector(`input[name=${name}]`);
  const labelFor = (formElement: string) =>
    container.querySelector(`label[for="${formElement}"]`);

  const expectToBeInputFieldOfTypeText = (
    formEvent: Element | null | undefined
  ) => {
    expect(formEvent).not.toBeUndefined();
    expect(formEvent).not.toBeNull();
    expect(formEvent?.tagName).toEqual("INPUT");
    expect((formEvent as any)?.type).toEqual("text");
  };

  const itRendersAsATextBox = (fieldName: string) => {
    it("renders as a text box", () => {
      render(<CustomerForm />);
      expectToBeInputFieldOfTypeText(field(fieldName));
    });
  };

  const itIncludesTheExistingValue = (fieldName: string) => {
    it("includes the existing value", () => {
      render(<CustomerForm {...{ [fieldName]: "value" }} />);
      expect((field(fieldName) as any)?.value).toEqual("value");
    });
  };

  const itRendersALabel = (label: string, value: string) => {
    it("renders a label", () => {
      render(<CustomerForm />);
      expect(labelFor(label)?.textContent).toEqual(value);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelId = (labelId: string) => {
    it("assign id that matches the label id", () => {
      render(<CustomerForm />);
      expect(field(labelId)?.id).toEqual(labelId);
    });
  };

  const itSubmitExistingValue = (inputName: string, value: string) => {
    it("save existing first name when submitted", async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [inputName]: value }}
          onSubmit={(props) => {
            if (props) {
              expect(props[inputName as keyof Customer]).toEqual(value);
            }
          }}
        />
      );
      const customerForm = form("customer");
      const firstNameField = field(inputName);
      const target: any = {
        value: value,
      };
      if (firstNameField) {
        await ReactTestUtils.Simulate.change(firstNameField, {
          target: target,
        });
      }
      if (customerForm) {
        await ReactTestUtils.Simulate.submit(customerForm);
      }
    });
  };

  const itSubmitsNewValue = (fieldName: any, value: string) =>
    it("saves new value when submitted", async () => {
      expect.hasAssertions();
      render(
        <CustomerForm
          {...{ [fieldName]: value }}
          onSubmit={(props) => {
            if (props) {
              expect(props[fieldName as keyof Customer]).toEqual(value);
            }
          }}
        />
      );
      const currentField = field(fieldName);
      if (currentField) {
        const targetValue: any = {
          value: value,
        };
        await ReactTestUtils.Simulate.change(currentField, {
          target: targetValue,
        });
      }
      const currentForm = form("customer");
      if (currentForm) {
        await ReactTestUtils.Simulate.submit(currentForm);
      }
    });
  beforeEach(() => {
    ({ render, container } = createContainer());
  });

  it("renders a form", () => {
    render(<CustomerForm />);
    expect(form("customer")).not.toBeNull();
  });
  describe("firs name field", () => {
    itRendersAsATextBox("firstName");
    itIncludesTheExistingValue("firstName");
    itRendersALabel("firstName", "First Name");
    itAssignsAnIdThatMatchesTheLabelId("firstName");
    itSubmitExistingValue("firstName", "firstName");
    itSubmitsNewValue("firstName", "anotherFirstName");
  });

  describe("last name field", () => {
    itRendersAsATextBox("lastName");
    itIncludesTheExistingValue("lastName");
    itRendersALabel("lastName", "Last Name");
    itAssignsAnIdThatMatchesTheLabelId("lastName");
    itSubmitExistingValue("lastName", "lastName");
    itSubmitsNewValue("lastName", "anotherLastName");
  });

  describe("phone number field", () => {
    itRendersAsATextBox("phone");
    itIncludesTheExistingValue("phone");
    itRendersALabel("phone", "Phone Number");
    itAssignsAnIdThatMatchesTheLabelId("phone");
    itSubmitExistingValue("phone", "Phone Number");
    itSubmitsNewValue("phone", "anotherPhone");
  });

  it('has a submit button', () => {
    render(<CustomerForm/>)
    const submitButton = container.querySelector('input[type=submit]')
    expect(submitButton).not.toBeNull()
  })
});
