const graphql = require('graphql');
const Depressiondegree = require('../models/depressiondegree');
const Author = require('../models/author');
const Situation = require('../models/situation');
const SituationCount = require('../models/situationCount');
const Registration = require('../models/registration');
const Kiesler = require('../models/kiesler');
const LoginStatistic = require('../models/loginStatistic');
const LastLogin = require('../models/lastLogin');
const Statistic = require('../models/statistic');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const StatisticType = new GraphQLObjectType({
    name: 'Statistic',
    fields: ( ) => ({
        id: { type: GraphQLID },
        count: { type: GraphQLInt },
        userCount: {
            type: GraphQLInt,
            resolve(parent, args){
                return Author.find({}).count();
            }
        },
        dayLoginCount: {
            type: GraphQLInt,
            args: { day: { type: GraphQLInt } },
            resolve(parent, args){
                return LoginStatistic.find({day: args.day}).count();
            }
        },
        counts: {
            type: GraphQLInt,
            resolve(parent, args){
                return LoginStatistic.find({}).count();
            }
        },
        inactiveUsers: {
            type: GraphQLInt,
            args: { date: { type: GraphQLString } },
            resolve(parent, args){
                return LastLogin.find({ date: { $lte: args.date }}).count();
            }
        },
        neuUsersCount: {
            type: GraphQLInt,
            args: { date: { type: GraphQLString } },
            resolve(parent, args){
                //return Registration.find({ date: { $gt: args.date }}).count();
                return Author.find({ date: { $gt: args.date }}).count();
            }
        }
    })
});

const LoginStatisticType = new GraphQLObjectType({
    name: 'LoginStatistic',
    fields: ( ) => ({
        id: { type: GraphQLID },
        day: { type: GraphQLInt },
        date: { type: GraphQLString },
        logintime: { type: GraphQLString },
        duration: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId);
            }
        },
        statistic: {
            type: StatisticType,
            resolve(parent, args){
                return Statistic.findById(parent.dayId);
            }
        }
    })
});

const RegistrationType = new GraphQLObjectType({
    name: 'Registration',
    fields: ( ) => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId);
            }
        }
    })
});

const DepressiondegreeType = new GraphQLObjectType({
    name: 'Depressiondegree',
    fields: ( ) => ({
        id: { type: GraphQLID },
        degree: { type: GraphQLInt },
        date: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId);
            }
        }
    })
});

const SituationCountType = new GraphQLObjectType({
    name: 'SituationCount',
    fields: ( ) => ({
        id: { type: GraphQLID },
        count: { type: GraphQLInt },
        date: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId);
            }
        }
    })
});

const SituationType = new GraphQLObjectType({
    name: 'Situation',
    fields: ( ) => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        date: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId);
            }
        }
    })
});

const KieslerType = new GraphQLObjectType({
    name: 'Kiesler',
    fields: ( ) => ({
        id: { type: GraphQLID },
        circlename: { type: GraphQLString },
        date: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId);
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        age: { type: GraphQLInt },
        gender: { type: GraphQLString },
        email: { type: GraphQLString },
        phase: { type: GraphQLString },
        date: { type: GraphQLString },
        registrations: {
            type: new GraphQLList(RegistrationType),
            resolve(parent, args){
                return Registration.find({ authorId: parent.id });
            }
        },
        depressiondegrees: {
            type: new GraphQLList(DepressiondegreeType),
            resolve(parent, args){
                return Depressiondegree.find({ authorId: parent.id });
            }
        },
        situations: {
            type: new GraphQLList(SituationType),
            resolve(parent, args){
                return Situation.find({ authorId: parent.id });
            }
        },
        kieslers: {
            type: new GraphQLList(KieslerType),
            resolve(parent, args){
                return Kiesler.find({ authorId: parent.id });
            }
        },
        situationCounts: {
            type: new GraphQLList(SituationCountType),
            resolve(parent, args){
                return SituationCount.find({ authorId: parent.id });
            }
        },
        loginCounts: {
            type: GraphQLInt,
            resolve(parent, args){
                return LoginStatistic.find({ authorId: parent.id }).count();
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        loginStatistic: {
            type: LoginStatisticType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return LoginStatistic.findById(args.id);
            }
        },
        depressiondegree: {
            type: GraphQLInt,
            args: { date: { type: GraphQLString } },
            resolve(parent, args){
                return Depressiondegree.find({date: args.date}).count();
            }
        },
        situation: {
            type: SituationType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Situation.findById(args.id);
            }
        },
        kiesler: {
            type: KieslerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Kiesler.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Author.findById(args.id);
            }
        },
        authorIds: {
            type: new GraphQLList(AuthorType),
            args: { email: { type: GraphQLString } },
            resolve(parent, args){
                return Author.find({email: args.email});
            }
        },
        loginStatistics: {
            type: new GraphQLList(LoginStatisticType),
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return LoginStatistic.find({});
            }
        },
        registrations: {
            type: GraphQLInt,
            args: { date: { type: GraphQLString } },
            resolve(parent, args){
                return Registration.find({date: args.date}).count();
            }
        },
        depressiondegrees: {
            type: new GraphQLList(DepressiondegreeType),
            resolve(parent, args){
                return Depressiondegree.find({});
            }
        },
        situations: {
            type: new GraphQLList(SituationType),
            resolve(parent, args){
                return Situation.find({});
            }
        },
        situationCounts: {
            type: new GraphQLList(SituationCountType),
            resolve(parent, args){
                return SituationCount.find({});
            }
        },
        kieslers: {
            type: new GraphQLList(KieslerType),
            resolve(parent, args){
                return Kiesler.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Author.find({});
            }
        },
        statistics: {
            type: new GraphQLList(StatisticType),
            resolve(parent, args){
                return Statistic.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                surname: { type: GraphQLString },
                age: { type: GraphQLInt },
                gender: { type: GraphQLString },
                email: { type: GraphQLString },
                phase: { type: GraphQLString },
                date: { type: GraphQLString }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    surname: args.surname,
                    age: args.age,
                    gender: args.gender,
                    email: args.email,
                    phase: args.phase,
                    date: args.date
                });
                return author.save();
            }
        },
        addStatistic: {
            type: StatisticType,
            args: {
                count: { type: GraphQLInt }
            },
            resolve(parent, args){
                let statistic = new Statistic({
                    count: args.count
                });
                return statistic.save();
            }
        },
        addLoginStatistic: {
            type: LoginStatisticType,
            args: {
                day: { type: GraphQLInt },
                date: { type: GraphQLString },
                logintime: { type: GraphQLString },
                duration: { type: GraphQLString },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let loginStatistic = new LoginStatistic({
                    day: args.day,
                    date: args.date,
                    logintime: args.logintime,
                    duration: args.duration,
                    authorId: args.authorId
                });
                return loginStatistic.save() &&
                LastLogin.update({ authorId: args.authorId }, { authorId: args.authorId, date: args.date }, { upsert : true });
            }
        },
        addDepressiondegree: {
            type: DepressiondegreeType,
            args: {
                degree: { type: new GraphQLNonNull(GraphQLInt) },
                date: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let depressiondegree = new Depressiondegree({
                    degree: args.degree,
                    date: args.date,
                    authorId: args.authorId
                });
                return depressiondegree.save();
            }
        },
        addRegistration: {
            type: RegistrationType,
            args: {
                date: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let registration = new Registration({
                    date: args.date,
                    authorId: args.authorId
                });
                return registration.save();
            }
        },
        addSituation: {
            type: SituationType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                date: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let situation = new Situation({
                    title: args.title,
                    description: args.description,
                    date: args.date,
                    authorId: args.authorId
                });
                return situation.save() &&
                SituationCount.update({ authorId: args.authorId, date: args.date }, { authorId: args.authorId,  $inc: { count: 1 } }, { upsert : true });
            }
        },
        addKiesler: {
            type: KieslerType,
            args: {
                circlename: { type: new GraphQLNonNull(GraphQLString) },
                date: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let kiesler = new Kiesler({
                    circlename: args.circlename,
                    date: args.date,
                    authorId: args.authorId
                });
                return kiesler.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
