import { expressjwt } from "express-jwt";
import { SECRET } from "@config";

const authorizationMiddleware = (role: string) => {
	return [
		// authenticate JWT token and attach user to request object (req.user)
		expressjwt({ secret: SECRET, algorithms: ["HS256"] }),

		// authorize based on user role
		(req, res, next) => {
			if (!role || role !== req.auth.role) {
				// user's role is not authorized
				return res.status(401).json({ message: "Unauthorized" });
			}

			// authentication and authorization successful
			next();
		},
	];
};

export default authorizationMiddleware;
