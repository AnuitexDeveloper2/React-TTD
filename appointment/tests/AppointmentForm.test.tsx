import React from "react";
import { createContainer } from "./DomManipulators";
import AppointmentForm from "../src/components/common/AppointmentForm";
import ReactTestUtils from "react-dom/test-utils";
import { getRandomAvailableSlots } from "../src/helper/DateHelper";

describe("<AppointmentForm/>", () => {
  let container: HTMLElement;
  let render: (component: JSX.Element) => void;
  const selectableServices = ["", "Cut", "Blow-dry"];
  const today = new Date();

  const findOption = (dropdownNode: Element, textContent: string) => {
    const options = Array.from(dropdownNode.childNodes);
    return options.find((option) => option.textContent === textContent);
  };

  beforeEach(() => {
    ({ container, render } = createContainer());
  });

  const timeSlotTable = () => container.querySelector("table#time-slot");
  const form = (id: string) => container.querySelector(`form[id=${id}]`);
  const field = (tag: string, name: string) =>
    form("appointment")?.querySelector(`${tag}[name=${name}]`);

  const startsAtField = (index: number) =>
    container.querySelectorAll(`input[name="startsAt"]`)[index];

  it("renders a form", () => {
    render(<AppointmentForm selectableServices={selectableServices} />);

    expect(form("appointment")).not.toBeNull();
  });

  describe("service field", () => {
    it("renders as a select box", () => {
      render(<AppointmentForm selectableServices={selectableServices} />);
      expect(field("select", "service")).not.toBeNull();
    });

    it("initially has a blank value chosen", () => {
      render(<AppointmentForm selectableServices={selectableServices} />);

      const firstNode = field("select", "service")?.childNodes[0];
      expect(firstNode?.textContent).toEqual("");
      expect((firstNode as any)?.selected).toBeTruthy();
    });

    it("lists all salon service", () => {
      render(<AppointmentForm selectableServices={selectableServices} />);

      const optionNodes = Array.from(
        field("select", "service")?.childNodes || []
      );
      const renderedServices = optionNodes
        ? optionNodes.map((node) => node.textContent)
        : [];
      expect(renderedServices).toEqual(
        expect.arrayContaining(selectableServices)
      );
    });

    it("pre-selects the existing value", () => {
      render(
        <AppointmentForm
          selectableServices={selectableServices}
          service="Blow-dry"
        />
      );

      const currentField = field("select", "service");
      expect(currentField).not.toBeNull();
      if (currentField) {
        const options = findOption(currentField, "Blow-dry");
        expect((options as any).selected).toBeTruthy();
      }
    });

    it("renders a label for select", () => {
      render(<AppointmentForm selectableServices={selectableServices} />);
      const label = container.querySelector("label");
      expect(label).not.toBeNull();
      expect(label?.textContent).toEqual("Our services");
    });

    it("assigned id that matches the label id", () => {
      render(<AppointmentForm selectableServices={selectableServices} />);
      const label = container.querySelector("label");
      expect(label?.id).toEqual("appointment-label");
    });

    it("save existing value when submitted", () => {
      const existingValue = "Blow-dry";
      expect.hasAssertions();
      render(
        <AppointmentForm
          selectableServices={selectableServices}
          service={existingValue}
          onSubmit={(service) => {
            expect(service).toEqual(existingValue);
          }}
        />
      );
      const serviceForm = form("appointment");
      expect(serviceForm).not.toBeNull();
      if (serviceForm) {
        ReactTestUtils.Simulate.submit(serviceForm);
      }
    });

    it("save new value when submitting", async () => {
      const existingValue = "Blow-dry";
      const target: any = {
        value: "Cut",
      };
      expect.hasAssertions();
      render(
        <AppointmentForm
          selectableServices={selectableServices}
          service={existingValue}
          onSubmit={(service) => {
            expect(service).toEqual("Cut");
          }}
        />
      );
      const serviceForm = form("appointment");
      const serviceField = field("select", "service");
      expect(serviceForm).not.toBeNull();
      expect(serviceField).not.toBeNull();
      if (serviceField) {
        await ReactTestUtils.Simulate.change(serviceField, { target });
      }
      if (serviceForm) {
        await ReactTestUtils.Simulate.submit(serviceForm);
      }
    });
  });

  describe("time a slot table", () => {
    it("render a table for time slot", () => {
      render(<AppointmentForm />);
      expect(timeSlotTable()).not.toBeNull();
    });

    it("renders a time slot for every half an hour between open and closetimes", () => {
      render(<AppointmentForm salonOpensAt={9} salonClosesAt={11} />);
      const timesOfDay = timeSlotTable()?.querySelectorAll("tbody >* th");
      expect(timesOfDay).not.toBeNull();
      if (timesOfDay) {
        expect(timesOfDay).toHaveLength(4);
        expect(timesOfDay[0].textContent).toEqual("09:00");
        expect(timesOfDay[1].textContent).toEqual("09:30");
        expect(timesOfDay[3].textContent).toEqual("10:30");
      }
    });

    it("renders an empty cell at the start of the header row", () => {
      render(<AppointmentForm />);
      const headerRow = timeSlotTable()?.querySelector("thead > tr ");
      expect(headerRow?.firstChild?.textContent).not.toBeTruthy();
    });

    it("renders a week of available dates", () => {
      const today = new Date(2018, 11, 1);
      render(<AppointmentForm today={today} />);
      const dates = timeSlotTable()?.querySelectorAll(
        "thead >* th:not(:first-child)"
      );
      expect(dates).toHaveLength(7);
      expect(dates).not.toBeNull();
      if (dates) {
        expect(dates[0].textContent).toEqual("Sat 01");
        expect(dates[1].textContent).toEqual("Sun 02");
      }
    });

    it("renders radio button for each time slot", () => {
      const today = new Date();

      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
      ];

      render(
        <AppointmentForm
          salonOpensAt={9}
          salonClosesAt={11}
          today={today}
          availableSlots={availableTimeSlots}
        />
      );
      const cells = timeSlotTable()?.querySelectorAll("td");
      expect(cells).not.toBeNull();
      if (cells) {
        expect(cells[0].querySelector("input[type=radio]")).not.toBeNull();
        expect(cells[7].querySelector("input[type=radio]")).not.toBeNull();
      }
    });

    it("does not render radio buttons buttons for unavailable time slots", () => {
      render(
        <AppointmentForm
          availableSlots={[]}
          today={new Date()}
          salonOpensAt={9}
          salonClosesAt={21}
        />
      );
      const timesOfDay = timeSlotTable()?.querySelectorAll("input");
      expect(timesOfDay).toHaveLength(0);
    });

    it("sets radio button values to the index of the corresponding appointment", () => {
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
      ];

      render(
        <AppointmentForm
          salonOpensAt={9}
          salonClosesAt={11}
          today={today}
          availableSlots={availableTimeSlots}
        />
      );

      expect(
        timeSlotTable()?.querySelectorAll("input[name=startsAt]")
      ).toHaveLength(2);

      expect((startsAtField(0) as any).value).toEqual(
        availableTimeSlots[0].startsAt.toString()
      );
      expect((startsAtField(1) as any).value).toEqual(
        availableTimeSlots[1].startsAt.toString()
      );
    });

    it("don't submit without selected slot", () => {
      expect.hasAssertions();
      render(
        <AppointmentForm
          salonOpensAt={9}
          salonClosesAt={19}
          today={today}
          availableSlots={getRandomAvailableSlots(9, 18)}
          onSubmit={(service) => {}}
        />
      );
      const submitButton = field("input", "appointment-submit-button");
      const appointmentForm = form("appointment");
      expect(appointmentForm).not.toBeNull();
      expect(submitButton).not.toBeNull();
      expect((submitButton as any).disabled).toEqual(true);
      if (submitButton) {
        ReactTestUtils.Simulate.click(submitButton);
      }
      if (appointmentForm) {
        const spyForm = jest.fn();
        expect(spyForm).not.toHaveBeenCalled();
      }
    });

    it("saves new value when submitted", async () => {
      expect.hasAssertions();
      const availableTimeSlots = getRandomAvailableSlots(9, 18);
      render(
        <AppointmentForm
          salonOpensAt={9}
          salonClosesAt={19}
          availableSlots={availableTimeSlots}
          today={today}
          onSubmit={(service, startsAt) =>
            expect(startsAt).toEqual(availableTimeSlots[1].startsAt)
          }
        />
      );
      const target: any = {
        value: availableTimeSlots[1].startsAt,
      };

      const currentTarget: any = {
        name: "startsAt",
      };
      const selectedSlot = container.querySelectorAll(
        `input[name="startsAt"]`
      )[1];

      if (selectedSlot) {
        await ReactTestUtils.Simulate.change(selectedSlot, {
          target,
          currentTarget,
        });
      }
      const appointmentForm = form("appointment");
      expect(appointmentForm).not.toBeNull();
      if (appointmentForm) {
        await ReactTestUtils.Simulate.submit(appointmentForm);
      }
    });
  });
});
