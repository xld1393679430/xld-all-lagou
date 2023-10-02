import { createDOMElement } from "../../DOM";
import { createReactInstance } from "../CreateReactInstance";

export default function creatStateNode(fiber) {
	if (fiber.tag === "host_component") {
		return createDOMElement(fiber)
	} else {
		return createReactInstance(fiber)
	}
}