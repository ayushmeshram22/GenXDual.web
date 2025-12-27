import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, Calendar, Globe, Target, GraduationCap, Briefcase } from "lucide-react";

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh",
  "Belgium", "Brazil", "Canada", "China", "Colombia", "Denmark", "Egypt", "Ethiopia",
  "Finland", "France", "Germany", "Ghana", "Greece", "India", "Indonesia", "Iran",
  "Iraq", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kenya", "Malaysia",
  "Mexico", "Morocco", "Nepal", "Netherlands", "New Zealand", "Nigeria", "Norway",
  "Pakistan", "Philippines", "Poland", "Portugal", "Qatar", "Russia", "Saudi Arabia",
  "Singapore", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sweden",
  "Switzerland", "Thailand", "Turkey", "UAE", "UK", "USA", "Vietnam", "Other"
];

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    age: "",
    country: "",
    has_prior_experience: "",
    experience_details: "",
    skill_level: "",
    goal: "",
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      } else {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (data) {
      setFormData({
        full_name: data.full_name || "",
        phone: data.phone || "",
        age: data.age?.toString() || "",
        country: data.country || "",
        has_prior_experience: data.has_prior_experience === true ? "yes" : data.has_prior_experience === false ? "no" : "",
        experience_details: data.experience_details || "",
        skill_level: data.skill_level || "",
        goal: data.goal || "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        phone: formData.phone,
        age: formData.age ? parseInt(formData.age) : null,
        country: formData.country,
        has_prior_experience: formData.has_prior_experience === "yes",
        experience_details: formData.has_prior_experience === "yes" ? formData.experience_details : null,
        skill_level: formData.skill_level || null,
        goal: formData.goal || null,
      })
      .eq("user_id", user.id);

    setLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Your profile has been updated successfully!",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Your Profile
            </h1>
            <p className="text-muted-foreground">
              Help us understand you better to personalize your learning experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Experience Questions */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Experience & Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prior Experience */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Do you have any prior experience in cybersecurity?
                  </Label>
                  <RadioGroup
                    value={formData.has_prior_experience}
                    onValueChange={(value) => setFormData({ ...formData, has_prior_experience: value })}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="exp-yes" />
                      <Label htmlFor="exp-yes" className="cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="exp-no" />
                      <Label htmlFor="exp-no" className="cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                  {formData.has_prior_experience === "yes" && (
                    <Textarea
                      placeholder="Please describe your experience..."
                      value={formData.experience_details}
                      onChange={(e) => setFormData({ ...formData, experience_details: e.target.value })}
                      className="mt-3"
                      rows={3}
                    />
                  )}
                </div>

                {/* Skill Level */}
                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    What is your current skill level?
                  </Label>
                  <RadioGroup
                    value={formData.skill_level}
                    onValueChange={(value) => setFormData({ ...formData, skill_level: value })}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="beginner" id="skill-beginner" />
                      <Label htmlFor="skill-beginner" className="cursor-pointer">Beginner</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="intermediate" id="skill-intermediate" />
                      <Label htmlFor="skill-intermediate" className="cursor-pointer">Intermediate</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="advanced" id="skill-advanced" />
                      <Label htmlFor="skill-advanced" className="cursor-pointer">Advanced</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Goal */}
                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    What is your goal?
                  </Label>
                  <RadioGroup
                    value={formData.goal}
                    onValueChange={(value) => setFormData({ ...formData, goal: value })}
                    className="grid grid-cols-2 md:grid-cols-3 gap-3"
                  >
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="job" id="goal-job" />
                      <Label htmlFor="goal-job" className="cursor-pointer text-sm">Job</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="freelancing" id="goal-freelancing" />
                      <Label htmlFor="goal-freelancing" className="cursor-pointer text-sm">Freelancing</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="bug_bounty" id="goal-bugbounty" />
                      <Label htmlFor="goal-bugbounty" className="cursor-pointer text-sm">Bug Bounty</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="personal_knowledge" id="goal-personal" />
                      <Label htmlFor="goal-personal" className="cursor-pointer text-sm">Personal Knowledge</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="own_company" id="goal-company" />
                      <Label htmlFor="goal-company" className="cursor-pointer text-sm">Own Company</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Basic Details */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="w-5 h-5 text-primary" />
                  Basic Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Full Name
                  </Label>
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  />
                </div>

                {/* Email (read-only from auth) */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-muted"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    Phone / WhatsApp
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    min="10"
                    max="100"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <Label htmlFor="country" className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    Country
                  </Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
