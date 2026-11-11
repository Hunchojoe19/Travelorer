import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../auth/AuthContext';
import { loadProfile, loadTravel, saveTravel } from '../lib/profileStore';
import ProfileLayout, { scrollContentToTop } from '../components/profile/ProfileLayout';
import ChoiceStep from '../components/profile/ChoiceStep';
import TravelComplete from '../components/travel/TravelComplete';
import TravelSummary from '../components/travel/TravelSummary';
import {
    BudgetQuestion,
    CountriesVisitedQuestion,
    LengthOfStayQuestion,
    RefusalQuestion,
    SelectQuestion,
} from '../components/travel/fields';
import { FUNDING_OPTIONS, PURPOSE_OPTIONS, RESERVATION_OPTIONS, VISA_TYPE_OPTIONS, YES_NO } from '../components/travel/options';

/** Each question is its own page: /evaluate/travel/<step>. Answers are stored under the step name. */
const STEPS = [
    'passport',
    'destination',
    'purpose',
    'visaType',
    'funding',
    'previousVisa',
    'invitation',
    'stay',
    'visited',
    'budget',
    'reservation',
    'refusal',
    'timeSensitive',
    'complete',
];
const QUESTION_COUNT = STEPS.length - 1;
const firstUnanswered = (answers) => STEPS.find((s) => s !== 'complete' && answers[s] === undefined) || 'complete';

export default function TravelWizard() {
    const { step } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [saved, setSaved] = useState(() => loadTravel(user?.id));
    const [draft, setDraft] = useState(saved);
    const isComplete = Boolean(saved.completedAt);
    const profileDone = Boolean(loadProfile(user?.id).completedAt);

    // Travel history comes after the personal profile.
    if (!profileDone) return <Navigate to="/evaluate/profile" replace />;

    if (!step) {
        if (isComplete) {
            return (
                <ProfileLayout activeSection="travel" completed={['personal', 'travel']}>
                    <TravelSummary
                        travel={saved}
                        onEdit={() => {
                            setDraft(saved);
                            navigate(`/evaluate/travel/${STEPS[0]}`);
                        }}
                    />
                </ProfileLayout>
            );
        }
        return <Navigate to={`/evaluate/travel/${firstUnanswered(saved)}`} replace />;
    }
    if (!STEPS.includes(step)) return <Navigate to="/evaluate/travel" replace />;

    const index = STEPS.indexOf(step);
    const goTo = (target) => {
        navigate(`/evaluate/travel/${target}`);
        scrollContentToTop();
    };

    const answer = (value) => {
        const next = { ...draft, [step]: value };
        setDraft(next);
        // First time through: save progress so the user can resume later.
        // Updating completed travel history: nothing is saved until they finish.
        if (!isComplete) {
            saveTravel(user?.id, next);
            setSaved(next);
        }
        goTo(STEPS[index + 1]);
    };

    const cancelUpdate = () => {
        setDraft(saved);
        navigate('/evaluate/travel');
    };

    const goBack = () => {
        if (index > 0) goTo(STEPS[index - 1]);
        else if (isComplete) cancelUpdate();
        else navigate('/evaluate/profile');
    };

    const finish = () => {
        const now = new Date().toISOString();
        const final = { ...draft, completedAt: saved.completedAt || now, updatedAt: now };
        saveTravel(user?.id, final);
        setSaved(final);
        setDraft(final);
        navigate('/evaluate/travel');
        scrollContentToTop();
        toast.success(isComplete ? 'Travel history updated.' : 'Travel history saved. Trip details are coming next.');
    };

    const choice = (title, options) => <ChoiceStep key={step} title={title} options={options} value={draft[step]} onSelect={answer} />;
    const select = (props) => <SelectQuestion key={step} value={draft[step]} onNext={answer} {...props} />;

    const content = {
        passport: select({ title: 'Which nationality or Country passport are you travelling with?', country: true }),
        destination: select({ title: 'Which country are you applying to visit?', country: true }),
        purpose: choice('What is the main purpose of your trip?', PURPOSE_OPTIONS),
        visaType: choice('What type of visa are you applying for?', VISA_TYPE_OPTIONS),
        funding: choice('Who is funding the trip?', FUNDING_OPTIONS),
        previousVisa: select({ title: 'Have you ever been issued a visa for the destination country before?', options: YES_NO }),
        invitation: select({
            title: 'Will you have a formal invitation from someone in your destination country?',
            subtitle: 'Depending on the visa type, either from a business or family or friend.',
            options: YES_NO,
        }),
        stay: <LengthOfStayQuestion key={step} value={draft.stay} onNext={answer} />,
        visited: <CountriesVisitedQuestion key={step} value={draft.visited} onNext={answer} />,
        budget: <BudgetQuestion key={step} value={draft.budget} onNext={answer} />,
        reservation: select({
            title: 'Have you made a reservation for either a flight or accommodation or both?',
            subtitle: 'Most countries do not require flight itinerary for your application but the choice of accommodation varies.',
            options: RESERVATION_OPTIONS,
        }),
        refusal: <RefusalQuestion key={step} value={draft.refusal} onNext={answer} />,
        timeSensitive: select({
            title: 'Is this application time-sensitive?',
            subtitle: 'Do you need an emergency of any sort due to deadlines, e.g. wedding date, medical treatment, etc.?',
            options: YES_NO,
        }),
        complete: <TravelComplete onNext={finish} />,
    }[step];

    return (
        <ProfileLayout activeSection="travel" completed={step === 'complete' || isComplete ? ['personal', 'travel'] : ['personal']}>
            <div className="mx-auto mb-4 h-1 max-w-2xl overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#003B95] to-[#2F6FED]"
                    initial={false}
                    animate={{ width: `${(index / QUESTION_COUNT) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
            </div>
            {step !== 'complete' && (
                <div className="mx-auto mb-6 flex max-w-2xl items-center justify-between text-xs text-gray-500">
                    <button type="button" onClick={goBack} className="inline-flex items-center gap-1 rounded px-1 py-1 hover:text-gray-800">
                        <HiArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <span className="flex items-center gap-3">
                        {isComplete && (
                            <button type="button" onClick={cancelUpdate} className="rounded px-2 py-1 font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800">
                                Cancel update
                            </button>
                        )}
                        <span aria-live="polite">
                            Question {index + 1} of {QUESTION_COUNT}
                        </span>
                    </span>
                </div>
            )}
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                >
                    {content}
                </motion.div>
            </AnimatePresence>
        </ProfileLayout>
    );
}
