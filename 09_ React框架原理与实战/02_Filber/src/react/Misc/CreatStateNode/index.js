import { createDOMElement } from "../../DOM";
import { createReactInstance } from "../CreateReactInstance";

export default function creatStateNode(filber) {
	if (filber.tag === "host_component") {
		return createDOMElement(filber)
	} else {
		return createReactInstance(filber)
	}
}