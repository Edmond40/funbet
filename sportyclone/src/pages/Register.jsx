import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/api/placeholder/200/50" 
            alt="SportyBet" 
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600">Join thousands of winners</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>

            <div className="flex gap-2">
              <Select defaultValue="+233">
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="+233">+233</SelectItem>
                  <SelectItem value="+234">+234</SelectItem>
                </SelectContent>
              </Select>
              <Input 
                placeholder="Mobile Number" 
                className="flex-1"
              />
            </div>

            <Input type="email" placeholder="Email Address" />
            
            <Input 
              type="password"
              placeholder="Password"
            />

            <Input 
              type="password"
              placeholder="Confirm Password"
            />

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ghs">GHS - Ghana Cedi</SelectItem>
                <SelectItem value="ghs">GHS - Ghana Cedi</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link to="/terms" className="text-sporty-red hover:underline">
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="privacy" />
                <label htmlFor="privacy" className="text-sm">
                  I agree to the{" "}
                  <Link to="/privacy" className="text-sporty-red hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="promotions" />
                <label htmlFor="promotions" className="text-sm">
                  I want to receive promotional offers
                </label>
              </div>
            </div>

            <Button className="w-full bg-sporty-red hover:bg-sporty-red-dark">
              Create Account
            </Button>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-sporty-red hover:underline font-medium">
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;