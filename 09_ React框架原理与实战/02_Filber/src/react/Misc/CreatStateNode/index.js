import { createDOMElement } from "../../DOM";

export default function creatStateNode(filber) {
	if (filber.tag === "host_component") {
		return createDOMElement(filber)
	}
}