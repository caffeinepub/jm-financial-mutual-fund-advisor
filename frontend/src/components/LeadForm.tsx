import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Send, Loader2, User, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FundCategory, InvestmentRange } from '../backend';
import { useSubmitLead, type LeadFormData } from '../hooks/useQueries';

const fundCategoryOptions: { value: FundCategory; label: string }[] = [
  { value: FundCategory.technology, label: 'Technology Funds' },
  { value: FundCategory.healthcare, label: 'Healthcare Funds' },
  { value: FundCategory.infrastructure, label: 'Infrastructure Funds' },
  { value: FundCategory.realEstate, label: 'Real Estate Funds' },
  { value: FundCategory.renewableEnergy, label: 'Renewable Energy Funds' },
];

const investmentRangeOptions: { value: InvestmentRange; label: string }[] = [
  { value: InvestmentRange.range1, label: '₹500 – ₹5,000 / month (SIP Starter)' },
  { value: InvestmentRange.range2, label: '₹5,000 – ₹25,000 / month' },
  { value: InvestmentRange.range3, label: '₹25,000 – ₹1 Lakh / month' },
  { value: InvestmentRange.range4, label: '₹1 Lakh – ₹5 Lakh (Lump Sum)' },
  { value: InvestmentRange.range5, label: '₹5 Lakh+ (High Net Worth)' },
];

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  fundCategory: FundCategory;
  investmentRange: InvestmentRange;
  message: string;
}

export default function LeadForm() {
  const submitLead = useSubmitLead();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const payload: LeadFormData = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        fundCategory: data.fundCategory,
        investmentRange: data.investmentRange,
        message: data.message || '',
      };
      await submitLead.mutateAsync(payload);
      toast.success('Consultation Request Submitted!', {
        description: 'Darshit Sheth will contact you within 24 hours. Thank you for your interest!',
        duration: 6000,
      });
      reset();
    } catch {
      toast.error('Submission Failed', {
        description: 'Please try again or contact us directly.',
      });
    }
  };

  return (
    <section id="lead-form" className="py-20 bg-forest-900 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold-400 mb-3">
              Get Started
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Book Your Free Consultation
            </h2>
            <p className="text-white/60 text-base max-w-xl mx-auto">
              Share your investment goals and Darshit Sheth will personally reach out to craft a
              tailored mutual fund strategy for you.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white/80 font-medium flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="e.g. Rahul Sharma"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-gold-400 focus:ring-gold-400/20"
                    {...register('fullName', { required: 'Full name is required' })}
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-xs">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80 font-medium flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="rahul@example.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-gold-400 focus:ring-gold-400/20"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone + City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/80 font-medium flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-gold-400 focus:ring-gold-400/20"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[+]?[\d\s\-()]{8,15}$/,
                        message: 'Enter a valid phone number',
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white/80 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> City *
                  </Label>
                  <Input
                    id="city"
                    placeholder="e.g. Mumbai, Delhi, Ahmedabad"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-gold-400 focus:ring-gold-400/20"
                    {...register('city', { required: 'City is required' })}
                  />
                  {errors.city && (
                    <p className="text-red-400 text-xs">{errors.city.message}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Fund Category + Investment Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-white/80 font-medium">Preferred Fund Category *</Label>
                  <Select
                    onValueChange={(val) => setValue('fundCategory', val as FundCategory, { shouldValidate: true })}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-gold-400 data-[placeholder]:text-white/30">
                      <SelectValue placeholder="Select fund type" />
                    </SelectTrigger>
                    <SelectContent>
                      {fundCategoryOptions.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    {...register('fundCategory', { required: 'Please select a fund category' })}
                  />
                  {errors.fundCategory && (
                    <p className="text-red-400 text-xs">{errors.fundCategory.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80 font-medium">Investment Amount Range *</Label>
                  <Select
                    onValueChange={(val) => setValue('investmentRange', val as InvestmentRange, { shouldValidate: true })}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-gold-400 data-[placeholder]:text-white/30">
                      <SelectValue placeholder="Select amount range" />
                    </SelectTrigger>
                    <SelectContent>
                      {investmentRangeOptions.map(({ value, label }) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input
                    type="hidden"
                    {...register('investmentRange', { required: 'Please select an investment range' })}
                  />
                  {errors.investmentRange && (
                    <p className="text-red-400 text-xs">{errors.investmentRange.message}</p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/80 font-medium flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" /> Message (Optional)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your investment goals, timeline, or any specific questions..."
                  rows={4}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-gold-400 focus:ring-gold-400/20 resize-none"
                  {...register('message')}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={submitLead.isPending}
                size="lg"
                className="w-full bg-gold-500 hover:bg-gold-400 text-forest-900 font-bold text-base py-3 rounded-md shadow-gold hover:shadow-lg transition-all duration-200"
              >
                {submitLead.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Consultation Request
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-white/40">
                Your information is secure and will only be used to contact you about your investment inquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
